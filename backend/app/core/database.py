import logging
from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.core.config import settings


logger = logging.getLogger(__name__)


class Base(DeclarativeBase):
    pass


connect_args = {"check_same_thread": False} if settings.database_url.startswith("sqlite") else {}
engine = create_engine(settings.database_url, connect_args=connect_args)
SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


def get_db() -> Generator[Session, None, None]:
    """Yield one database session for the lifetime of a request."""
    with SessionLocal() as session:
        yield session


def seed_menu(session: Session) -> None:
    """Seed the menu once when the table is empty."""
    from app.data.menu import MENU_ITEMS
    from app.models.models import MenuItemModel

    if session.query(MenuItemModel.id).first() is not None:
        return

    try:
        session.add_all(MenuItemModel(**item) for item in MENU_ITEMS)
        session.commit()
        logger.info("Seeded %s menu items", len(MENU_ITEMS))
    except Exception:
        session.rollback()
        logger.exception("Unable to seed menu items")
        raise


def init_db() -> None:
    """Create missing tables and seed initial reference data."""
    from app.models import models  # noqa: F401

    Base.metadata.create_all(bind=engine)
    with SessionLocal() as session:
        seed_menu(session)
