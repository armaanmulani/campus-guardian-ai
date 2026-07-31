from fastapi import FastAPI, Form, UploadFile, File, HTTPException, Header
from typing import Optional
import traceback

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
    try:

        # -----------------------------
        # AI Incident Analysis
        # -----------------------------
        incident = await analyze_incident(
            text=f"""
Incident Type: {incident_type}

Title: {title}

Description: {description}
""",
            image=image
        )

        print("===== INCIDENT =====")
        print(incident.model_dump())

        # -----------------------------
        # Ticket Generation
        # -----------------------------
        ticket = generate_ticket(incident)

        print("===== TICKET =====")
        print(ticket.model_dump())

        # -----------------------------
        # Merge Incident + Ticket
        # -----------------------------
        combined_incident = {
            **incident.model_dump(),
            **ticket.model_dump()
        }

        # Optional: remove duplicate summary field
        combined_incident.pop("summary", None)

        # -----------------------------
        # Final Response
        # -----------------------------
        return {
            "user_id": x_user_id,
            "incident": combined_incident
        }

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )