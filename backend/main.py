from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.api.v1.endpoints import orders
from app.core.database import init_db
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    init_db()
    yield
    # Shutdown logic (if any)
    pass

app = FastAPI(title="887 Cafe API", lifespan=lifespan)
app.include_router(orders.router)

#LIVE KEYS
# PAYMONGO_SECRET_KEY = os.getenv("PAYMONGO_SECRET_KEY_LIVE")
# PAYMONGO_PUBLIC_KEY = os.getenv("PAYMONGO_PUBLIC_KEY")

#TEST KEYS
PAYMONGO_SECRET_KEY = os.getenv("PAYMONGO_SECRET_KEY_TEST")
# PAYMONGO_PUBLIC_KEY = os.getenv("PAYMONGO_PUBLIC_KEY_TEST")

# Get allowed origins from environment variable or fallback to a safe default
allowed_origins_str = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
allowed_origins = allowed_origins_str.split(",")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


