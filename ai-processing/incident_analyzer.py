import os
import json
import base64
from typing import Optional

from dotenv import load_dotenv
from fastapi import UploadFile, HTTPException
from groq import Groq

from models import Incident

# --------------------------------------------------
# Environment
# --------------------------------------------------

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise RuntimeError("GROQ_API_KEY not found.")

client = Groq(api_key=api_key)

# --------------------------------------------------
# Campus Nodes
# --------------------------------------------------

CAMPUS_NODES = [
    {"node_id": "n1", "name": "AB (Academic Block 1)"},
    {"node_id": "n2", "name": "AB2 (Academic Block 2)"},
    {"node_id": "n3", "name": "MPH (Multi-Purpose Hall)"},
    {"node_id": "n4", "name": "Special Block"},
    {"node_id": "n5", "name": "Main Gate"},
]

# --------------------------------------------------
# Prompt
# --------------------------------------------------

SYSTEM_PROMPT = f"""
You are an AI Incident Analyzer for a university campus.

Your task is to analyze the student's text and/or uploaded image.

Use ONLY the following campus locations:

{json.dumps(CAMPUS_NODES, indent=2)}

Return ONLY valid JSON.

Do NOT return markdown.

Schema:

{{
    "location": "...",
    "node_id": "...",
    "category": "...",
    "severity": "...",
    "short_summary": "...",
    "action_to_be_for_student": "...",
    "action_to_be_for_admin": "..."
}}

Rules:

Category must be one of:

Construction
Water Leakage
Fire
Broken Lift
Blocked Corridor
Medical Emergency
Power Failure
Garbage
Other

Severity:

Low
Medium
High
Critical

If location cannot be determined,

location = "UNKNOWN"

node_id = "UNKNOWN"
"""

# --------------------------------------------------
# Analyzer
# --------------------------------------------------


async def analyze_incident(
    text: Optional[str] = None,
    image: Optional[UploadFile] = None,
) -> Incident:

    if not text and not image:
        raise HTTPException(
            status_code=400,
            detail="Either text or image must be provided."
        )

    content = []

    if text:
        content.append(
            {
                "type": "text",
                "text": text
            }
        )

    else:
        content.append(
            {
                "type": "text",
                "text": "Analyze this image."
            }
        )

    model = "llama-3.3-70b-versatile"

    if image:

        image_bytes = await image.read()

        encoded = base64.b64encode(image_bytes).decode()

        content.append(
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:{image.content_type};base64,{encoded}"
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

        return Incident(**parsed)

    except json.JSONDecodeError:

        raise HTTPException(
            status_code=500,
            detail="AI returned invalid JSON."
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )