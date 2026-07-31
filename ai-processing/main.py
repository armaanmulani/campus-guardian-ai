from fastapi import FastAPI

from frontend_api import router as incident_router
from routing_api import router as navigation_router

app = FastAPI(
    title="Campus Guardian AI",
    version="1.0.0",
    description="AI Backend for Campus Guardian"
)


# -----------------------------
# Health Check
# -----------------------------
@app.get("/")
async def home():
    return {
        "service": "Campus Guardian AI",
        "status": "Running"
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }


# -----------------------------
# Register APIs
# -----------------------------
app.include_router(incident_router)
app.include_router(navigation_router)