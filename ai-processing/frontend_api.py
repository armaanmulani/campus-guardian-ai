from fastapi import FastAPI, Form, UploadFile, File, Header
from typing import Optional

from incident_analyzer import analyze_incident
from ticket_generator import generate_ticket

app = FastAPI()


@app.post("/api/v1/incidents/report")
async def report_incident(
    incident_type: str = Form(...),
    title: str = Form(...),
    description: str = Form(...),
    image: Optional[UploadFile] = File(None),
    x_user_id: str = Header(...)
):

    incident = await analyze_incident(
        text=f"""
Incident Type: {incident_type}

Title: {title}

Description: {description}
""",
        image=image
    )

    ticket = generate_ticket(incident)

    return {
        "user_id": x_user_id,
        "incident": incident.model_dump(),
        "ticket": ticket.model_dump()
    }

