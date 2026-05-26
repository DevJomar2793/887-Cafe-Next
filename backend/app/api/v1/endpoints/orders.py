from fastapi import APIRouter, HTTPException, status
from app.schemas.schema import OrderCreate, OrderResponse
from app.services.order_service import create_order, get_orders, get_order_by_id
from app.core.database import get_db

router = APIRouter()

@router.get("/api/v1/orderlist", response_model=list[OrderResponse])
async def list_orders():
    try:
        return get_orders()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

# Need to Fix the POST request for order
@router.post("/api/v1/add_order", status_code=status.HTTP_201_CREATED, response_model=OrderResponse)
async def place_order(order: OrderCreate):
    try:
        return create_order(order.customer_name, order.total_amount)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))



@router.get("/{order_id}", response_model=OrderResponse)
async def read_order(order_id: int):
    try:
        order = get_order_by_id(order_id)
        if not order:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
        return order
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
