from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


##################################### ORDERS LIST #####################################
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


##################################### MENU LIST #####################################
class MenuItemBase(BaseModel):
    name: str
    description: str
    price: float
    image: str
    category: str

class MenuItemCreate(MenuItemBase):
    pass

class MenuItemResponse(MenuItemBase):
    id: int

    class Config:
        from_attributes = True

class Config:
    from_attributes = True
