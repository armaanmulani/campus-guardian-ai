from fastapi import FastAPI, UploadFile, File, Form
from typing import Optional

from incident_analyzer import analyze_incident

app = FastAPI()


@app.post("/analyze")
async def analyze(
    text: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None)
):
    incident = await analyze_incident(text, image)

    return incident