from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_add_order():
    response = client.post(
        "/api/v1/add_order",
        json={"customer_name": "Test Customer", "total_amount": 10.5}
    )
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.json()}")
    assert response.status_code == 201
    assert response.json()["message"] == "Order added successfully"
    assert "order" in response.json()
    assert response.json()["order"]["customer_name"] == "Test Customer"

if __name__ == "__main__":
    try:
        test_add_order()
        print("Test Passed!")
    except Exception as e:
        print(f"Test Failed: {e}")
        exit(1)
