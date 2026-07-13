from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.orders import OrderCreate, OrderDelete, OrderMessageResponse, OrderResponse, OrderUpdate
from app.services import order_service


router = APIRouter(prefix="/api", tags=["orders"])


@router.get("/orderlist", response_model=list[OrderResponse])
def list_orders(session: Session = Depends(get_db)):
    return order_service.get_orders(session)


@router.post("/add_order", status_code=status.HTTP_201_CREATED, response_model=OrderMessageResponse)
def place_order(order_data: OrderCreate, session: Session = Depends(get_db)):
    order = order_service.create_order(
        session,
        customer_name=order_data.customer_name,
        total_amount=order_data.total_amount,
    )
    return {"message": "Order added successfully", "order": order}


@router.get("/order_details/{order_id}", response_model=OrderResponse)
def read_order(order_id: int, session: Session = Depends(get_db)):
    order = order_service.get_order_by_id(session, order_id)
    if order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order


@router.put("/update_order/{order_id}", response_model=OrderUpdate)
def update_order(order_id: int, order_data: OrderUpdate, session: Session = Depends(get_db)):
    order = order_service.update_order_data(session, order_id, order_data.customer_name, order_data.status)
    if order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order


@router.delete("/delete_order/{order_id}", response_model=OrderDelete)
def delete_order(order_id: int, session: Session = Depends(get_db)):
    order = order_service.delete_order_data(session, order_id)
    if order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return {"message": "Order deleted successfully", "order": order}
