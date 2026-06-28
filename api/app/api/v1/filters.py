from typing import List

from fastapi import Query, Depends,APIRouter
from sqlalchemy.orm import Session

from app.core.permission import is_admin
from app.db.session import get_db
from app.auth.dependencies import get_current_user

from app.models import Tasks, Projects, Taskstatus, Platforms, ProjectPlatform

router = APIRouter()

@router.get("/options")
def get_filter_options(
    module: str = Query(...),
    project_id: List[int] | None = Query(None),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    options = {}

    if module == "tasks":

        # ----------------------------
        # Status options
        # Common for everyone
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
        # Projects
        # User based
        # ----------------------------

        if is_admin(current_user):

            projects = db.query(Projects).all()

        else:

            projects = (
                db.query(Projects)
                .filter(Projects.created_by == current_user.id)
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
        # Platforms
        # Depends on project
        # ----------------------------

        if project_id:

            # Selected project(s)
            # project_id can be single or multiple

            if not isinstance(project_id, list):
                project_ids = [project_id]
            else:
                project_ids = project_id


            platforms = (
                db.query(Platforms)

                .join(
                    ProjectPlatform,
                    ProjectPlatform.platform_id == Platforms.id
                )

                .filter(
                    ProjectPlatform.project_id.in_(project_ids)
                )

                .distinct()

                .all()
            )


        else:

            # No project selected

            if is_admin(current_user):

                platforms = (
                    db.query(Platforms)
                    .all()
                )


            else:

                # Platforms from current user's projects

                platforms = (
                    db.query(Platforms)

                    .join(
                        ProjectPlatform,
                        ProjectPlatform.platform_id == Platforms.id
                    )

                    .join(
                        Projects,
                        Projects.id == ProjectPlatform.project_id
                    )

                    .filter(
                        Projects.created_by == current_user.id
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
