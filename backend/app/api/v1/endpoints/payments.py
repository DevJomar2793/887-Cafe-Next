from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.payments import PaymentSessionRequest
from app.services import order_service, payment_service


router = APIRouter(tags=["payments"])


@router.post("/create-session")
async def create_payment_session(request: PaymentSessionRequest, session: Session = Depends(get_db)):
    order = order_service.get_order_by_id(session, request.order_id)
    if order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")

    try:
        checkout_session = await payment_service.create_checkout_session(
            order_id=order.order_number,
            amount=order.total_amount,
            customer_name=order.customer_name,
        )
        return {
            "checkout_url": checkout_session["data"]["attributes"]["checkout_url"],
            "order_id": order.id,
        }
    except payment_service.PaymentConfigurationError as error:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(error)) from error
    except (KeyError, RuntimeError) as error:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(error)) from error


@router.post("/webhook")
async def paymongo_webhook(request: Request, session: Session = Depends(get_db)):
    payload: dict[str, Any] = await request.json()
    attributes = payload.get("data", {}).get("attributes", {})
    if attributes.get("type") != "checkout_session.payment_success":
        return {"status": "success"}

    description = attributes.get("description", "")
    order_number = description.removeprefix("Payment for Order ")
    if not order_number or order_number == description:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing order reference")

    order = order_service.update_order_status_by_number(session, order_number, "Completed")
    if order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return {"status": "success"}
