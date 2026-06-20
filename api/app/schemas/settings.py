from pydantic import BaseModel


class SettingUpdate(BaseModel):

    setting_key: str

    setting_value: str


class SettingResponse(BaseModel):

    id: int

    setting_key: str

    setting_value: str

    description: str | None

    class Config:
        from_attributes = True