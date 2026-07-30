from pydantic import BaseModel

class Incident(BaseModel):
    location: str
    node_id: str
    category: str
    severity: str
    short_summary: str
    action_to_be_for_student: str
    action_to_be_for_admin: str
