from dataclasses import dataclass
import os
from pathlib import Path

from dotenv import load_dotenv


load_dotenv()


@dataclass(frozen=True)
class Settings:
    database_url: str
    allowed_origins: tuple[str, ...]
    paymongo_secret_key: str | None
    paymongo_api_url: str = "https://api.paymongo.com/v1"

    @classmethod
    def from_environment(cls) -> "Settings":
        default_database = Path(__file__).resolve().parent / "887.db"
        origins = tuple(
            origin.strip()
            for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
            if origin.strip()
        )
        return cls(
            database_url=os.getenv("DATABASE_URL", f"sqlite:///{default_database}"),
            allowed_origins=origins,
            paymongo_secret_key=os.getenv("PAYMONGO_SECRET_KEY"),
        )


settings = Settings.from_environment()
