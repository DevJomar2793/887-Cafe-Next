from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from app.core.database import Base


class OrderModel(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String)
    customer_name = Column(String)
    total_amount = Column(Float)
    status = Column(String, default="Pending")
    order_time = Column(String)
    created_at = Column(DateTime, server_default=func.now())


class MenuItemModel(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    price = Column(Float)
    image = Column(String)
    category = Column(String)
