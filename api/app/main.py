from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.api.v1.api_v1 import api_router
from app.models import Tasks, Projects, User,Tasktype ,Taskhistory  # IMPORTANT

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Worklog Management API",
    version="1.0"
)

# Register all routes in one line
app.include_router(api_router, prefix="/api/v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",   # React
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)