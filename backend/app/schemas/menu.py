from pydantic import BaseModel, ConfigDict


class MenuItemBase(BaseModel):
    name: str
    description: str
    price: float
    image: str
    category: str


class MenuItemCreate(MenuItemBase):
    pass


class MenuItemResponse(MenuItemBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
