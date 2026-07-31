from fastapi import APIRouter, UploadFile, File, Form, Header, HTTPException
from typing import Optional

from incident_analyzer import analyze_incident
from ticket_generator import generate_ticket
from backend_api import send_to_backend

router = APIRouter(
    prefix="/api/v1/incidents",
    tags=["Incidents"]
)


@router.post("/report")
async def report_incident(
    incident_type: str = Form(...),
    title: str = Form(...),
    description: str = Form(...),
    image: Optional[UploadFile] = File(None),
    x_user_id: str = Header(...)
):
    """
    Complete AI pipeline

    Frontend
        ↓
    AI Incident Analyzer
        ↓
    Ticket Generator
        ↓
    Backend API
    """

    try:

        # ---------------------------------
        # Analyze Incident
        # ---------------------------------

        incident = await analyze_incident(
            text=f"""
Incident Type: {incident_type}

Title: {title}

Description: {description}
""",
            image=image
        )

        # ---------------------------------
        # Generate Ticket
        # ---------------------------------

        ticket = generate_ticket(incident)

        # ---------------------------------
        # Merge Incident + Ticket
        # ---------------------------------

        combined_data = {
            **incident.model_dump(),
            **ticket.model_dump()
        }

        # remove duplicate summary field
        combined_data.pop("summary", None)

        # ---------------------------------
        # Send to Backend
        # ---------------------------------

        backend_response = await send_to_backend(
            user_id=x_user_id,
            incident_data=combined_data
        )

        # ---------------------------------
        # Success
        # ---------------------------------

        return {
            "success": True,
            "message": "Incident successfully processed.",
            "backend_response": backend_response
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )