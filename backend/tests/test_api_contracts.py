import unittest

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

from app.core.database import Base, get_db
from main import create_app


class ApiContractTests(unittest.TestCase):
    def setUp(self) -> None:
        self.engine = create_engine(
            "sqlite://",
            connect_args={"check_same_thread": False},
            poolclass=StaticPool,
        )
        Base.metadata.create_all(self.engine)
        self.session = Session(self.engine, expire_on_commit=False)
        app = create_app()

        def override_database():
            yield self.session

        app.dependency_overrides[get_db] = override_database
        self.client = TestClient(app)

    def tearDown(self) -> None:
        self.client.close()
        self.session.close()
        self.engine.dispose()

    def test_order_endpoints_keep_existing_paths_and_shapes(self) -> None:
        created_response = self.client.post(
            "/api/add_order",
            json={"customer_name": "Grace", "total_amount": 18.75},
        )
        self.assertEqual(created_response.status_code, 201)
        created = created_response.json()["order"]
        self.assertEqual(created["customer_name"], "Grace")
        self.assertEqual(created["status"], "Pending")

        order_id = created["id"]
        self.assertEqual(self.client.get("/api/orderlist").status_code, 200)
        self.assertEqual(self.client.get(f"/api/order_details/{order_id}").json()["id"], order_id)

        updated = self.client.put(
            f"/api/update_order/{order_id}",
            json={"customer_name": "Grace Hopper", "status": "Completed"},
        )
        self.assertEqual(updated.status_code, 200)
        self.assertEqual(updated.json(), {"customer_name": "Grace Hopper", "status": "Completed"})

        deleted = self.client.delete(f"/api/delete_order/{order_id}")
        self.assertEqual(deleted.status_code, 200)
        self.assertEqual(deleted.json()["message"], "Order deleted successfully")

    def test_payment_webhook_is_registered(self) -> None:
        schema = self.client.get("/openapi.json").json()
        self.assertIn("/webhook", schema["paths"])
        self.assertIn("post", schema["paths"]["/webhook"])


if __name__ == "__main__":
    unittest.main()
