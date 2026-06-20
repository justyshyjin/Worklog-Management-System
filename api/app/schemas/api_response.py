from pydantic import BaseModel


class ApiResponse(BaseModel):

    success: bool = True

    message: str = ""

    data: dict | list | None = None