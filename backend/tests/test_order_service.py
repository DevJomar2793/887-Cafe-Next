import unittest
from datetime import datetime

from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

from app.core.database import Base, seed_menu
from app.models.models import MenuItemModel
from app.services import order_service


class OrderServiceTests(unittest.TestCase):
    def setUp(self) -> None:
        self.engine = create_engine(
            "sqlite://",
            connect_args={"check_same_thread": False},
            poolclass=StaticPool,
        )
        Base.metadata.create_all(self.engine)
        self.session = Session(self.engine, expire_on_commit=False)

    def tearDown(self) -> None:
        self.session.close()
        self.engine.dispose()

    def test_order_lifecycle_preserves_public_fields(self) -> None:
        order = order_service.create_order(self.session, "Ada", 12.5)

        self.assertEqual(order.customer_name, "Ada")
        self.assertEqual(order.total_amount, 12.5)
        self.assertEqual(order.status, "Pending")
        self.assertTrue(order.order_number.startswith("ORD-"))
        self.assertIs(order_service.get_order_by_id(self.session, order.id), order)

        updated = order_service.update_order_data(self.session, order.id, "Ada Lovelace", "Completed")
        self.assertIsNotNone(updated)
        self.assertEqual(updated.customer_name, "Ada Lovelace")
        self.assertEqual(updated.status, "Completed")

        deleted = order_service.delete_order_data(self.session, order.id)
        self.assertIsNotNone(deleted)
        self.assertIsNone(order_service.get_order_by_id(self.session, order.id))

    def test_daily_order_numbers_increment(self) -> None:
        timestamp = datetime(2026, 7, 13, 9, 30)
        self.assertEqual(order_service.generate_order_number(self.session, timestamp), "ORD-26/07/13/001")

        first = order_service.create_order(self.session, "First", 5)
        first.order_number = "ORD-26/07/13/001"
        self.session.commit()

        self.assertEqual(order_service.generate_order_number(self.session, timestamp), "ORD-26/07/13/002")

    def test_menu_seed_is_idempotent(self) -> None:
        seed_menu(self.session)
        first_count = self.session.query(MenuItemModel).count()
        seed_menu(self.session)

        self.assertEqual(first_count, 17)
        self.assertEqual(self.session.query(MenuItemModel).count(), first_count)


if __name__ == "__main__":
    unittest.main()
