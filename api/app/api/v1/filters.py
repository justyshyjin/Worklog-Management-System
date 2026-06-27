from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.auth.dependencies import get_current_user

from app.models import Tasks, Projects, Taskstatus, Platforms

router = APIRouter()

@router.get("/options")
def get_filter_options(
    module: str = Query(...),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    options = {}



    if module == "tasks":



        # ----------------------------
        # Task Status options
        # ----------------------------

        statuses = (
            db.query(
                Taskstatus.id,
                Taskstatus.status_name
            )
            .distinct()
            .all()
        )


        options["statuses"] = [

            {
                "id": status.id,
                "name": status.status_name
            }

            for status in statuses

        ]



        # ----------------------------
        # Project options
        # ----------------------------

        if current_user.role == "admin":

            projects = (
                db.query(Projects)
                .all()
            )

        else:

            projects = (
                db.query(Projects)
                .join(Tasks)
                .filter(
                    Tasks.created_by ==
                    current_user.id
                )
                .distinct()
                .all()
            )


        options["projects"] = [

            {
                "id": project.id,
                "name": project.project_name
            }

            for project in projects

        ]



        # ----------------------------
        # Platform options
        # ----------------------------

        if current_user.role == "admin":

            platforms = (
                db.query(Platforms)
                .all()
            )

        else:

            platforms = (
                db.query(Platforms)
                .join(Tasks)
                .filter(
                    Tasks.created_by ==
                    current_user.id
                )
                .distinct()
                .all()
            )


        options["platforms"] = [

            {
                "id": platform.id,
                "name": platform.platform_name
            }

            for platform in platforms

        ]



    return options
