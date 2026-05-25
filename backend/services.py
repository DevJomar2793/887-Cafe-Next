import sqlite3
from datetime import datetime
from .database import get_db

def generate_order_number():
    """
    Generates a custom order number in the format: ORD-YY/MM/DD/XXX
    Example: ORD-26/05/25/001
    """
    now = datetime.now()
    date_str = now.strftime("%y/%m/%d")
    
    with get_db() as conn:
        cursor = conn.cursor()
        # Count orders placed on the current date
        cursor.execute(
            "SELECT COUNT(*) FROM orders WHERE order_number LIKE ?", 
            (f"ORD-{date_str}/%",)
        )
        count = cursor.fetchone()[0]
        
    # Increment count and pad with zeros to 3 digits
    order_seq = str(count + 1).zfill(3)
    return f"ORD-{date_str}/{order_seq}"

def create_order(customer_name: str, total_amount: float):
    """Saves a new order to the database."""
    order_number = generate_order_number()
    order_time = datetime.now().strftime("%H:%M:%S")
    
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO orders (order_number, customer_name, total_amount, order_time)
            VALUES (?, ?, ?, ?)
        ''', (order_number, customer_name, total_amount, order_time))
        conn.commit()
        return order_number
