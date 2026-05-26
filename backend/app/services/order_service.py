from datetime import datetime
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.models import OrderModel

def generate_order_number():
    """
    Generates a custom order number in the format: ORD-YY/MM/DD/XXX
    Example: ORD-26/05/25/001
    """
    now = datetime.now()
    date_str = now.strftime("%y/%m/%d")
    
    db = SessionLocal()
    try:
        # Count orders placed on the current date
        count = db.query(OrderModel).filter(OrderModel.order_number.like(f"ORD-{date_str}/%")).count()
    finally:
        db.close()
        
    # Increment count and pad with zeros to 3 digits
    order_seq = str(count + 1).zfill(3)
    return f"ORD-{date_str}/{order_seq}"

def create_order(customer_name: str, total_amount: float):
    """Saves a new order to the database and returns the created order."""
    order_number = generate_order_number()
    order_time = datetime.now().strftime("%H:%M:%S")
    
    db = SessionLocal()
    try:
        new_order = OrderModel(
            order_number=order_number,
            customer_name=customer_name,
            total_amount=total_amount,
            order_time=order_time,
            status="Pending"
        )
        db.add(new_order)
        db.commit()
        db.refresh(new_order)
        return {"message": "Order added successfully",
                "orders": new_order}
    finally:
        db.close()

def get_orders():
    """Retrieves all orders from the database."""
    db = SessionLocal()
    try:
        return db.query(OrderModel).all()
    finally:
        db.close()

def get_order_by_id(order_id: int):
    """Retrieves a specific order by its ID."""
    db = SessionLocal()
    try:
        return db.query(OrderModel).filter(OrderModel.id == order_id).first()
    finally:
        db.close()
