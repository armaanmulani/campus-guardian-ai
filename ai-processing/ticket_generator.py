from datetime import datetime
import uuid

from pydantic import BaseModel

from models import Incident


# ---------------------------------------
# Category -> Department Mapping
# ---------------------------------------

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

# ---------------------------------------
# Severity -> Priority Mapping
# ---------------------------------------

SEVERITY_PRIORITY = {
    "Low": "P4",
    "Medium": "P3",
    "High": "P2",
    "Critical": "P1"
}

# ---------------------------------------
# Priority -> SLA Mapping
# ---------------------------------------

SLA_MAPPING = {
    "P1": "15 Minutes",
    "P2": "2 Hours",
    "P3": "8 Hours",
    "P4": "24 Hours"
}


# ---------------------------------------
# Ticket Model
# ---------------------------------------

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

    created_at: str


# ---------------------------------------
# Ticket Generator
# ---------------------------------------

def generate_ticket(incident: Incident) -> Ticket:
    """
    Generates a maintenance ticket from an analyzed incident.
    """

    department = CATEGORY_TO_DEPARTMENT.get(
        incident.category,
        "General Maintenance"
    )

    priority = SEVERITY_PRIORITY.get(
        incident.severity,
        "P4"
    )

    sla = SLA_MAPPING.get(
        priority,
        "24 Hours"
    )

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
        summary=incident.short_summary,
        created_at=datetime.utcnow().isoformat()
    )

    return ticket