"""Backward-compatible schema exports.

New code should import from the domain-specific schema modules.
"""

from app.schemas.menu import MenuItemBase, MenuItemCreate, MenuItemResponse
from app.schemas.orders import (
    OrderBase,
    OrderCreate,
    OrderDelete,
    OrderMessageResponse,
    OrderResponse,
    OrderUpdate,
)
from app.schemas.payments import PaymentSessionRequest

__all__ = [
    "MenuItemBase",
    "MenuItemCreate",
    "MenuItemResponse",
    "OrderBase",
    "OrderCreate",
    "OrderDelete",
    "OrderMessageResponse",
    "OrderResponse",
    "OrderUpdate",
    "PaymentSessionRequest",
]
