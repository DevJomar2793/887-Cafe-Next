from pydantic import BaseModel


class PaymentSessionRequest(BaseModel):
    order_id: int
