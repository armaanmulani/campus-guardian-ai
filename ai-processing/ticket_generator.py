from pydantic import BaseModel
from models import Incident
import uuid

CATEGORY_TO_DEPARTMENT = {
    "Water Leakage": "Civil Maintenance",
    "Power Failure": "Electrical Maintenance",
    "Broken Lift": "Lift Maintenance",
    "Fire": "Campus Security",
    "Medical Emergency": "Medical Center",
    "Construction": "Campus Administration",
    "Garbage": "Housekeeping",
    "Blocked Corridor": "Campus Security",
    "Other": "General Maintenance"
}

SEVERITY_PRIORITY = {
    "Low": "P4",
    "Medium": "P3",
    "High": "P2",
    "Critical": "P1"
}

SLA = {
    "P1": "15 Minutes",
    "P2": "2 Hours",
    "P3": "8 Hours",
    "P4": "24 Hours"
}

ticket_id = f"INC-{str(uuid.uuid4())[:8].upper()}"



class Ticket(BaseModel):

    ticket_id: str

    location: str

    node_id: str

    category: str

    severity: str

    priority: str

    department: str

    sla: str

    status: str

    summary: str



def generate_ticket(incident: Incident):

    department = CATEGORY_TO_DEPARTMENT[incident.category]

    priority = SEVERITY_PRIORITY[incident.severity]

    sla = SLA[priority]

    ticket = Ticket(
        ticket_id=f"INC-{uuid.uuid4().hex[:8].upper()}",
        location=incident.location,
        node_id=incident.node_id,
        category=incident.category,
        severity=incident.severity,
        priority=priority,
        department=department,
        sla=sla,
        status="OPEN",
        summary=incident.short_summary
    )

    return ticket