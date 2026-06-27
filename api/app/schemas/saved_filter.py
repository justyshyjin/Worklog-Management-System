from pydantic import BaseModel
from typing import Dict, Any


class SavedFilterCreate(BaseModel):

    module: str

    name: str

    filter_json: Dict[str, Any]



class SavedFilterResponse(BaseModel):

    id: int

    module: str

    name: str

    filter_json: Dict[str, Any]


    class Config:
        from_attributes = True