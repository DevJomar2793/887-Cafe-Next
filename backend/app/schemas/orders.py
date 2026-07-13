from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class OrderBase(BaseModel):
    customer_name: str = Field(min_length=1, max_length=80)
    total_amount: float = Field(ge=0)


class OrderCreate(OrderBase):
    id: int | None = None
    order_number: str | None = None
    order_time: str | None = None
    status: str | None = None


class OrderResponse(OrderBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    order_number: str
    order_time: str
    status: str
    created_at: datetime | None = None


class OrderMessageResponse(BaseModel):
    message: str
    order: OrderResponse


class OrderUpdate(BaseModel):
    customer_name: str = Field(min_length=1, max_length=80)
    status: str = Field(min_length=1, max_length=40)


class OrderDelete(BaseModel):
    message: str
    order: OrderResponse
