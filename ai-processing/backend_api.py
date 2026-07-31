import httpx
from fastapi import HTTPException

# Replace this with your teammate's backend API URL
BACKEND_API_URL = "http://172.25.186.196:8080/api/v1/internal/ingest"


async def send_to_backend(user_id: str, incident_data: dict):
    """
    Sends the combined incident JSON to the main backend.
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

        if response.status_code not in [200, 201]:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Backend Error: {response.text}"
            )

        return response.json()

    except httpx.RequestError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Could not connect to backend: {str(e)}"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )