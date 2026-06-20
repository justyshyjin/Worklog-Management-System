from fastapi import Depends
from fastapi import HTTPException

from app.auth.dependencies import (
    get_current_user
)


def admin_required(
    user=Depends(get_current_user)
):

    if user.role != "ADMIN":

        raise HTTPException(
            status_code=403,
            detail="Permission denied"
        )

    return user