import base64
from typing import Any

import httpx

from app.core.config import settings


class PaymentConfigurationError(RuntimeError):
    pass


async def create_checkout_session(
    order_id: str,
    amount: float,
    customer_name: str,
    customer_email: str = "customer@example.com",
) -> dict[str, Any]:
    """Create a PayMongo hosted checkout session for an order."""
    if not settings.paymongo_secret_key:
        raise PaymentConfigurationError("PAYMONGO_SECRET_KEY is not configured")

    authorization = base64.b64encode(f"{settings.paymongo_secret_key}:".encode()).decode()
    payload = {
        "data": {
            "attributes": {
                "send_email_receipt": True,
                "show_description": True,
                "description": f"Payment for Order {order_id}",
                "payment_method_types": ["card", "gcash", "maya"],
                "line_items": [{
                    "currency": "PHP",
                    "amount": int(amount * 100),
                    "description": f"Order {order_id}",
                    "name": "887 Cafe Order",
                    "quantity": 1,
                }],
                "payment_intent": {"capture": "automatic"},
                "customer": {"name": customer_name, "email": customer_email},
            }
        }
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": f"Basic {authorization}",
    }

    async with httpx.AsyncClient(timeout=20) as client:
        response = await client.post(
            f"{settings.paymongo_api_url}/checkout_sessions",
            json=payload,
            headers=headers,
        )
        if response.status_code != 200:
            raise RuntimeError(f"PayMongo API Error: {response.status_code} - {response.text}")
        return response.json()
