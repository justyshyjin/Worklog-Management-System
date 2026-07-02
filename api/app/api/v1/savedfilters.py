from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.models.savedfilters import SavedFilters

from app.schemas.saved_filter import (
    SavedFilterCreate
)

router = APIRouter()

@router.get("")
def get_saved_filters(
    module:str,
    db:Session = Depends(get_db)
):


    filters = (
        db.query(SavedFilters)
        .filter(
            SavedFilters.module == module
        )
        .all()
    )


    return {
        "items": filters
    }





@router.get("/{id}")
def get_saved_filter(
    id:int,
    db:Session = Depends(get_db)
):

    return (
        db.query(SavedFilter)
        .filter(
            SavedFilter.id == id
        )
        .first()
    )





@router.post("")
def create_saved_filter(
    data:SavedFilterCreate,
    db:Session = Depends(get_db)
):

    filter_obj = SavedFilter(

        user_id=1,

        module=data.module,

        name=data.name,

        filter_json=data.filter_json

    )


    db.add(filter_obj)

    db.commit()

    db.refresh(filter_obj)


    return filter_obj





@router.delete("/{id}")
def delete_saved_filter(
    id:int,
    db:Session = Depends(get_db)
):

    obj = (
        db.query(SavedFilter)
        .filter(
            SavedFilter.id == id
        )
        .first()
    )


    db.delete(obj)

    db.commit()


    return {
        "message":"Deleted successfully"
    }