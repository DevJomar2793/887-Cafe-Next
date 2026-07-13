from datetime import datetime

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.models import OrderModel


def generate_order_number(session: Session, now: datetime | None = None) -> str:
    """Generate an order number in the existing ORD-YY/MM/DD/XXX format."""
    timestamp = now or datetime.now()
    date_part = timestamp.strftime("%y/%m/%d")
    prefix = f"ORD-{date_part}/"
    daily_count = session.scalar(
        select(func.count(OrderModel.id)).where(OrderModel.order_number.like(f"{prefix}%"))
    ) or 0
    return f"{prefix}{daily_count + 1:03d}"


def create_order(session: Session, customer_name: str, total_amount: float) -> OrderModel:
    now = datetime.now()
    order = OrderModel(
        order_number=generate_order_number(session, now),
        customer_name=customer_name,
        total_amount=total_amount,
        order_time=now.strftime("%H:%M:%S"),
        status="Pending",
    )
    session.add(order)
    session.commit()
    session.refresh(order)
    return order


def get_orders(session: Session) -> list[OrderModel]:
    return list(session.scalars(select(OrderModel)).all())


def get_order_by_id(session: Session, order_id: int) -> OrderModel | None:
    return session.get(OrderModel, order_id)


def update_order_data(session: Session, order_id: int, name: str, status: str) -> OrderModel | None:
    order = session.get(OrderModel, order_id)
    if order is None:
        return None
    order.customer_name = name
    order.status = status
    session.commit()
    session.refresh(order)
    return order


def delete_order_data(session: Session, order_id: int) -> OrderModel | None:
    order = session.get(OrderModel, order_id)
    if order is None:
        return None
    session.delete(order)
    session.commit()
    return order


def update_order_status_by_number(session: Session, order_number: str, status: str) -> OrderModel | None:
    order = session.scalar(select(OrderModel).where(OrderModel.order_number == order_number))
    if order is None:
        return None
    order.status = status
    session.commit()
    session.refresh(order)
    return order
