from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class OrderBase(BaseModel):
    id: Optional[int] = None
    order_number: Optional[str] = None
    customer_name: str
    total_amount: float
    order_time: Optional[str] = None
    status: Optional[str] = None

class OrderCreate(OrderBase):
    pass

class OrderResponse(OrderBase):
    id: int
    order_number: str
    customer_name: str
    total_amount: float
    order_time: str
    status: str
    created_at: Optional[datetime] = None

class OrderMessageResponse(BaseModel):
    message: str
    order: OrderResponse

class OrderUpdate(BaseModel):
    customer_name: str
    status: str

class OrderDelete(BaseModel):
    message: str
    order: OrderResponse

class Config:
    from_attributes = True
