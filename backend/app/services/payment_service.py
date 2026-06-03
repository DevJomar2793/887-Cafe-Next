import os
# pyrefly: ignore [missing-import]
import httpx
from typing import Dict, Any
from dotenv import load_dotenv
load_dotenv()

PAYMONGO_SECRET_KEY = os.getenv("PAYMONGO_SECRET_KEY")
PAYMONGO_API_URL = "https://api.paymongo.com/v1"

async def create_checkout_session(order_id: str, amount: float, customer_name: str, customer_email: str = "customer@example.com") -> Dict[str, Any]:
    """
    Creates a PayMongo Checkout Session to redirect the user to a hosted payment page.
    """
    url = f"{PAYMONGO_API_URL}/checkout_sessions"
    
    # Convert amount to cents as required by PayMongo
    amount_in_cents = int(amount * 100)
    
    payload = {
        "data": {
            "attributes": {
                "send_email_receipt": True,
                "show_description": True,
                "description": f"Payment for Order {order_id}",
                "payment_method_types": ["card", "gcash", "maya"],
                "line_items": [
                    {
                        "currency": "PHP",
                        "amount": amount_in_cents,
                        "description": f"Order {order_id}",
                        "name": "887 Cafe Order",
                        "quantity": 1,
                    }
                ],
                "payment_intent": {
                    "capture": "automatic",
                },
                "customer": {
                    "name": customer_name,
                    "email": customer_email,
                },
            },
        },
    }

    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": f"Basic {PAYMONGO_SECRET_KEY}" # Note: PayMongo usually expects Basic auth with secret key
    }
    
    # PayMongo Basic Auth uses secret key as username and empty password
    import base64
    auth_str = f"{PAYMONGO_SECRET_KEY}:"
    encoded_auth = base64.b64encode(auth_str.encode()).decode()
    headers["authorization"] = f"Basic {encoded_auth}"

    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload, headers=headers)
        
        if response.status_code != 200:
            raise Exception(f"PayMongo API Error: {response.status_code} - {response.text}")
            
        return response.json()
