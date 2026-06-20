from pydantic import BaseModel


class PlatformCreate(BaseModel):

    platform_name: str

    description: str | None = None


class PlatformUpdate(BaseModel):

    platform_name: str | None = None

    description: str | None = None

    is_active: bool | None = None


class PlatformResponse(BaseModel):

    id: int

    platform_name: str

    description: str | None

    is_active: bool

    class Config:
        from_attributes = True