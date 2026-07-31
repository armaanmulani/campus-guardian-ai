from pydantic import BaseModel


# ---------------------------------------
# Incident Model
# ---------------------------------------

class Incident(BaseModel):
    location: str
    node_id: str

    category: str
    severity: str

    short_summary: str

    action_to_be_for_student: str
    action_to_be_for_admin: str


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
# Navigation Request
# ---------------------------------------

class RouteRequest(BaseModel):
    latitude: float
    longitude: float
    destination: str


# ---------------------------------------
# Navigation Response
# ---------------------------------------

class RouteResponse(BaseModel):
    success: bool
    message: str

    latitude: float
    longitude: float
    destination: str