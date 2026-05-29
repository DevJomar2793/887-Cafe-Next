from app.services import order_service
from fastapi import APIRouter, HTTPException, status
from app.schemas.schema import OrderCreate, OrderResponse, OrderMessageResponse, OrderUpdate, OrderDelete
from app.services.order_service import create_order, get_orders, get_order_by_id, update_order_data, delete_order_data
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


@router.put("/api/update_order/{order_id}", response_model=OrderUpdate)
async def update_order(order_id: int, order_data: OrderUpdate):
    try:
        updated_order = update_order_data(order_id, order_data.customer_name, order_data.status)
        if not updated_order:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
        return updated_order
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.delete("/api/delete_order/{order_id}", response_model=OrderDelete)
async def delete_order(order_id: int):
    try:
        deleted_order = delete_order_data(order_id)
        if not deleted_order:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
        return {"message": "Order deleted successfully",
                "order": deleted_order
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    
