from app.services import order_service
from fastapi import APIRouter, HTTPException, status
from app.schemas.schema import OrderCreate, OrderResponse, OrderMessageResponse
from app.services.order_service import create_order, get_orders, get_order_by_id
from app.core.database import get_db

router = APIRouter()

@router.get("/api/orderlist", response_model=list[OrderResponse])
async def list_orders():
    try:
        return get_orders()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/api/add_order", status_code=status.HTTP_201_CREATED, response_model=OrderMessageResponse)
async def place_order(order_data: OrderCreate):
    try:
        created_order = create_order(
            customer_name=order_data.customer_name,
            total_amount=order_data.total_amount
        )
        return {"message": "Order added successfully",
                "order": created_order
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))



@router.get("/api/order_details/{order_id}", response_model=OrderResponse)
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
