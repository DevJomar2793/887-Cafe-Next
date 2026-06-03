from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get the absolute path to the directory where this file is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_DB_PATH = os.path.join(BASE_DIR, "887.db")
DEFAULT_SQLALCHEMY_DATABASE_URL = f"sqlite:///{DEFAULT_DB_PATH}"

# Use DATABASE_URL from .env or fallback to default
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", DEFAULT_SQLALCHEMY_DATABASE_URL)

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """Dependency to get a SQLAlchemy database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def seed_menu():
    """Seeds the menu_items table with initial data."""
    from app.models.models import MenuItemModel
    db = SessionLocal()
    try:
        # Check if menu items already exist
        if db.query(MenuItemModel).first() is None:
            print("Seeding menu items...")
            menu_data = [
                {"id": 1, "name": "Caramel Macchiato", "description": "Freshly steamed milk with vanilla-flavored syrup marked with espresso.", "price": 5.50, "image": "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=1974&auto=format&fit=crop", "category": "Coffee"},
                {"id": 2, "name": "Oat Milk Latte", "description": "Smooth espresso with creamy oat milk and a touch of sweetness.", "price": 6.00, "image": "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1974&auto=format&fit=crop", "category": "Coffee"},
                {"id": 3, "name": "Vanilla Sweet Cream", "description": "Slow-steeped cold brew topped with house-made vanilla sweet cream.", "price": 5.25, "image": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=2069&auto=format&fit=crop", "category": "Coffee"},
                {"id": 4, "name": "Hazelnut Praline", "description": "Rich espresso with toasted hazelnut and caramelized praline topping.", "price": 6.50, "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1974&auto=format&fit=crop", "category": "Coffee"},
                {"id": 5, "name": "Matcha Latte", "description": "Premium grade matcha blended with creamy steamed milk.", "price": 5.75, "image": "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1974&auto=format&fit=crop", "category": "Non-Coffee"},
                {"id": 6, "name": "Dark Chocolate Mocha", "description": "Rich Belgian chocolate melted into espresso and steamed milk.", "price": 5.50, "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop", "category": "Non-Coffee"},
                {"id": 7, "name": "Butter Croissant", "description": "Flaky, buttery traditional French pastry baked fresh daily.", "price": 4.25, "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1974&auto=format&fit=crop", "category": "Pastries"},
                {"id": 8, "name": "Almond Danish", "description": "Sweet almond cream filling topped with toasted almond flakes.", "price": 4.75, "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1974&auto=format&fit=crop", "category": "Pastries"},
                {"id": 9, "name": "Spaghetti Carbonara", "description": "Al dente pasta with a rich egg and pecorino cheese sauce.", "price": 12.00, "image": "/images/Spaghetti Carbonara.jpeg", "category": "Pasta & Noodles"},
                {"id": 10, "name": "Lasagna", "description": "Layered pasta with rich meat sauce and melted cheese.", "price": 13.50, "image": "/images/Lasagna.jpeg", "category": "Pasta & Noodles"},
                {"id": 11, "name": "Pansit Bihon", "description": "Traditional Filipino stir-fried noodles with vegetables and meat.", "price": 11.00, "image": "/images/Pansit Bihin.jpeg", "category": "Pasta & Noodles"},
                {"id": 12, "name": "Mac and Cheese", "description": "Creamy macaroni pasta baked with a blend of premium cheeses.", "price": 10.50, "image": "/images/Mac and Cheese.jpeg", "category": "Pasta & Noodles"},
                {"id": 13, "name": "Chicken Popper Fries", "description": "Crispy golden fries topped with bite-sized popcorn chicken.", "price": 8.50, "image": "/images/Chicken Popper Fries.jpeg", "category": "Pica-Pica"},
                {"id": 14, "name": "Fries Overload", "description": "Golden fries loaded with cheese sauce, bacon bits, and chives.", "price": 9.50, "image": "/images/Fries Overload.jpeg", "category": "Pica-Pica"},
                {"id": 15, "name": "Nachos Overload", "description": "Crispy tortilla chips smothered in cheese, jalapeños, and salsa.", "price": 10.00, "image": "/images/Nachos Overload.jpeg", "category": "Pica-Pica"},
                {"id": 16, "name": "Pork Sisig", "description": "Sizzling chopped pork with onions, chili, and a squeeze of calamansi.", "price": 14.00, "image": "/images/Pork Sisig.jpeg", "category": "Rice Meal"},
                {"id": 17, "name": "Pork Pepper Lunch", "description": "Sizzling pork steak marinated in a savory pepper sauce.", "price": 15.00, "image": "/images/Pork Pepper Lunch.jpeg", "category": "Rice Meal"},
            ]
            for item in menu_data:
                menu_item = MenuItemModel(**item)
                db.add(menu_item)
            db.commit()
            print(f"Successfully seeded {len(menu_data)} menu items.")
        else:
            print("Menu items already exist in database, skipping seed.")
    except Exception as e:
        print(f"Error seeding menu items: {e}")
        db.rollback()
    finally:
        db.close()

def init_db():
    """Initializes the database and creates tables based on SQLAlchemy models."""
    from app.models.models import OrderModel, MenuItemModel
    Base.metadata.create_all(bind=engine)
    seed_menu()
    print("Database initialized and tables created using SQLAlchemy models.")
