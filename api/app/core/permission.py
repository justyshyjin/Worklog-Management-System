# app/core/permissions.py

from fastapi import Depends, HTTPException

from app.auth.dependencies import get_current_user



def is_admin(user):
    """
    Check whether user has admin role
    """

    if not user:
        return False

    return user.role.lower() == "admin"



def is_owner(user, owner_id):
    """
    Check whether logged-in user owns the resource
    """

    if not user:
        return False

    return user.id == owner_id



def require_admin(
    current_user=Depends(get_current_user)
):
    """
    FastAPI dependency:
    Allows only admin users
    """

    if not is_admin(current_user):

        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return current_user



def require_owner(
    owner_id: int,
    current_user=Depends(get_current_user)
):
    """
    Validate resource ownership
    """

    if is_admin(current_user):
        return current_user


    if not is_owner(
        current_user,
        owner_id
    ):

        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )


    return current_user



def can_view_all_tasks(user):
    """
    Whether user can see all tasks
    """

    return is_admin(user)



def can_view_project(user, project_created_by):
    """
    Project visibility rule

    Admin:
        All projects

    User:
        Only own projects
    """

    if is_admin(user):
        return True


    return is_owner(
        user,
        project_created_by
    )



def can_view_task(user, task_created_by):
    """
    Task visibility rule

    Admin:
        All tasks

    User:
        Only own tasks
    """

    if is_admin(user):
        return True


    return is_owner(
        user,
        task_created_by
    )