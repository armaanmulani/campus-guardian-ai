import os
import json
import base64
from typing import Optional

from dotenv import load_dotenv
from fastapi import UploadFile, HTTPException
from groq import Groq

from models import Incident

# ---------------------------------------
# Load Environment Variables
# ---------------------------------------
load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise RuntimeError("GROQ_API_KEY not found.")

client = Groq(api_key=api_key)

# ---------------------------------------
# Campus Nodes
# ---------------------------------------

CAMPUS_NODES = [
    {"node_id": "n1", "name": "AB (Academic Block 1)"},
    {"node_id": "n2", "name": "AB2 (Academic Block 2)"},
    {"node_id": "n3", "name": "MPH (Multi-Purpose Hall)"},
    {"node_id": "n4", "name": "Special Block"},
    {"node_id": "n5", "name": "Main Gate"}
]

# ---------------------------------------
# System Prompt
# ---------------------------------------

SYSTEM_PROMPT = f""" You are an AI Incident Analyzer for a university campus. Analyze the student's text and/or image report. You MUST extract the incident details and map it to the closest physical location using ONLY the valid campus nodes provided below. Valid Campus Nodes: {json.dumps(CAMPUS_NODES, indent=2)} Return ONLY a valid JSON object. Do not include markdown formatting or explanations. Use exactly this structure: {{ "location": "Extracted location name from text/image [AB, AB2, MPH, Special Block, etc]", "node_id": "The exact matching node_id from the valid nodes list (or 'UNKNOWN' if completely unclear)", "category": "Choose ONE: Construction, Water Leakage, Fire, Broken Lift, Blocked Corridor, Medical Emergency, Power Failure, Garbage, Other", "severity": "Choose ONE: Low, Medium, High, Critical", "short_summary": "Concise 1-sentence description of the hazard", "action_to_be_for_student": "This is the action required for students to bypass this issue", "action_to_be_for_admin": "Immediate operational action required by security or maintenance [AB, AB2, MPH, Special Block, etc]" }} """

# ---------------------------------------
# Main Function
# ---------------------------------------

async def analyze_incident(
    text: Optional[str] = None,
    image: Optional[UploadFile] = None
) -> Incident:

    if not text and not image:
        raise HTTPException(
            status_code=400,
            detail="Text or image is required."
        )

    content = []

    if text:
        content.append({
            "type": "text",
            "text": text
        })
    else:
        content.append({
            "type": "text",
            "text": "Analyze this image and detect the campus incident."
        })

    model = "llama-3.3-70b-versatile"

    if image:

        image_bytes = await image.read()

        encoded = base64.b64encode(image_bytes).decode("utf-8")

        mime = image.content_type or "image/jpeg"

        content.append(
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:{mime};base64,{encoded}"
                }
            }
        )

        model = "llama-3.2-11b-vision-preview"

    try:

        completion = client.chat.completions.create(

            model=model,

            temperature=0.1,

            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": content
                }
            ]
        )

        response = completion.choices[0].message.content.strip()

        response = (
            response
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        parsed = json.loads(response)

        incident = Incident(**parsed)

        return incident

    except json.JSONDecodeError:

        raise HTTPException(
            status_code=500,
            detail="Model returned invalid JSON."
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )