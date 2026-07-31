from fastapi import FastAPI, Form, UploadFile, File, HTTPException, Header
from typing import Optional
import traceback

from incident_analyzer import analyze_incident
from ticket_generator import generate_ticket
from backend_api import send_to_backend

app = FastAPI()


@app.post("/api/v1/incidents/report")
async def report_incident(
    incident_type: str = Form(...),
    title: str = Form(...),
    description: str = Form(...),
    image: Optional[UploadFile] = File(None),
    x_user_id: str = Header(...)
):
    try:

        # AI Analysis
        incident = await analyze_incident(
            text=f"""
Incident Type: {incident_type}

Title: {title}

Description: {description}
""",
            image=image
        )

        # Ticket Generation
        ticket = generate_ticket(incident)

        # Merge both
        combined_incident = {
            **incident.model_dump(),
            **ticket.model_dump()
        }

        combined_incident.pop("summary", None)

        # Send to backend
        await send_to_backend(
            user_id=x_user_id,
            incident_data=combined_incident
        )

        # Just acknowledge that processing succeeded
        return {
            "success": True,
            "message": "Incident processed and forwarded to backend."
        }

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )