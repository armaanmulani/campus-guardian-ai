import os
import httpx
from dotenv import load_dotenv
from fastapi import HTTPException

# ---------------------------------------
# Load Environment Variables
# ---------------------------------------

load_dotenv()

BACKEND_API_URL = os.getenv(
    "BACKEND_API_URL",
    "http://localhost:8080/api/v1/incidents"
)


# ---------------------------------------
# Send Incident to Main Backend
# ---------------------------------------

async def send_to_backend(
    user_id: str,
    incident_data: dict
):
    """
    Sends processed incident to the main backend.
    """

    payload = {
        "user_id": user_id,
        "incident": incident_data
    }

    try:

        async with httpx.AsyncClient(timeout=30.0) as client:

            response = await client.post(
                BACKEND_API_URL,
                json=payload,
                headers={
                    "Content-Type": "application/json"
                }
            )

        if response.status_code not in (200, 201):

            raise HTTPException(
                status_code=response.status_code,
                detail=f"Backend Error: {response.text}"
            )

        return response.json()

    except httpx.ConnectError:

        raise HTTPException(
            status_code=500,
            detail="Could not connect to backend."
        )

    except httpx.TimeoutException:

        raise HTTPException(
            status_code=500,
            detail="Backend request timed out."
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )