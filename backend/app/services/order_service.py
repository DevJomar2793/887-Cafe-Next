from datetime import datetime
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.models import OrderModel

def generate_order_number():
    """
    Generates a custom order number in the format: ORD-YY/MM/DD/XXX
    Example: ORD-26/05/28/001
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
        return new_order
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

def update_order_data(id: int, name: str, status: str):
    """Updates the status of a specific order."""
    db = SessionLocal()
    try:
        order = db.query(OrderModel).filter(OrderModel.id == id).first()
        if not order:
            return None
        order.customer_name = name
        order.status = status
        db.commit()
        db.refresh(order)
        return order
    finally:
        db.close()

def delete_order_data(id: int):
    """Deletes the order by its ID."""
    db = SessionLocal()
    try:
        order = db.query(OrderModel).filter(OrderModel.id == id).first()
        if not order:
            return None
        db.delete(order)
        db.commit()
        return order
    finally:
        db.close()

def update_order_status_by_number(order_number: str, status: str):
    """Updates the status of an order based on its unique order number."""
    db = SessionLocal()
    try:
        order = db.query(OrderModel).filter(OrderModel.order_number == order_number).first()
        if not order:
            print(f"Order {order_number} not found for status update.")
            return None
        order.status = status
        db.commit()
        db.refresh(order)
        return order
    finally:
        db.close()
    
    
    
