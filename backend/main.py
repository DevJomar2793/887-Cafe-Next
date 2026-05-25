from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .services import create_order
from .database import init_db

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class OrderRequest(BaseModel):
    customer_name: str
    total_amount: float

@app.on_event("startup")
async def startup_event():
    init_db()

@app.get("/")
async def root():
    return {"message": "Hello World from 887 Cafe Backend!"}

@app.post("/orders")
async def place_order(order: OrderRequest):
    try:
        order_id = create_order(order.customer_name, order.total_amount)
        return {"status": "success", "order_number": order_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
