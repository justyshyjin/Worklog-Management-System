from pydantic import BaseModel

class Taskhistory(BaseModel):
    __tablename__ = "task_history"

    id = Column(BigInteger, primary_key=True, index=True)
    task_id = Column(BigInteger, ForeignKey("tasks.id"))
    from_status_id = Column(Integer)
    to_status_id = Column(Integer)
    old_assigned_to = Column(Integer)
    new_assigned_to = Column(Integer)
    action = Column(String(50))
    changed_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)