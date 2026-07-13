from datetime import datetime

from sqlalchemy import DateTime, Float, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class OrderModel(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    order_number: Mapped[str] = mapped_column(String)
    customer_name: Mapped[str] = mapped_column(String)
    total_amount: Mapped[float] = mapped_column(Float)
    status: Mapped[str] = mapped_column(String, default="Pending")
    order_time: Mapped[str] = mapped_column(String)
    created_at: Mapped[datetime | None] = mapped_column(DateTime, server_default=func.now())


class MenuItemModel(Base):
    __tablename__ = "menu_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    price: Mapped[float] = mapped_column(Float)
    image: Mapped[str] = mapped_column(String)
    category: Mapped[str] = mapped_column(String)
