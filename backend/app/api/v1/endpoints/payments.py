from fastapi import APIRouter, HTTPException, Request, status
from app.services import payment_service, order_service
from app.schemas.schema import PaymentSessionRequest

router = APIRouter()

@router.post("/create-session")
async def create_payment_session(request: PaymentSessionRequest):
    try:
        # 1. Fetch order details
        order = order_service.get_order_by_id(request.order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        # 2. Create PayMongo Checkout Session
        # We use order_number for the PayMongo order reference
        session = await payment_service.create_checkout_session(
            order_id=order.order_number,
            amount=order.total_amount,
            customer_name=order.customer_name
        )
        
        # The checkout URL is located in data -> attributes -> checkout_url
        checkout_url = session["data"]["attributes"]["checkout_url"]
        
        return {
            "checkout_url": checkout_url,
            "order_id": order.id
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

router.post("/webhook")
async def paymongo_webhook(request: Request):
    """
    Webhook handler for PayMongo events.
    """
    payload = await request.json()
    event_type = payload.get("data", {}).get("attributes", {}).get("type")
    
    if event_type == "checkout_session.payment_success":
        # Extract the order reference we passed in the description or metadata
        # In our case, it's embedded in the description: "Payment for Order ORD-..."
        description = payload["data"]["attributes"]["description"]
        order_number = description.replace("Payment for Order ", "")
        
        # We need to find the order by order_number and update it
        # This requires a new method in order_service
        from app.services.order_service import update_order_status_by_number
        update_order_status_by_number(order_number, "Completed")
        
        print(f"Order {order_number} marked as Completed via PayMongo webhook.")
        
    return {"status": "success"}
