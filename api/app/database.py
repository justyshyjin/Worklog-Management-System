from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# DB URL (change this if needed)
DATABASE_URL = "mysql+pymysql://root:root@localhost/worklog_management"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()