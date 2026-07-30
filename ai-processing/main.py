import os
import json
import base64
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from typing import Optional
from groq import Groq

# 1. Load Environment Variables
load_dotenv()
api_key = os.getenv("GROQ_API_KEY")
# 2. Fast-Fail Debug Check
if not api_key:
    print("❌ ERROR: Could not find GROQ_API_KEY in the environment.")
    exit(1)
else:
    print(f"✅ Groq API Key loaded successfully! (Starts with: {api_key[:8]}...)")

# -----------------------------------
# Groq Client Setup
# -----------------------------------
client = Groq(api_key=api_key)

# -----------------------------------
# FastAPI App
# -----------------------------------
app = FastAPI(
    title="Campus Guardian AI (Powered by Groq)",
    version="3.0"
)

# -----------------------------------
# Campus Graph Nodes
# -----------------------------------
CAMPUS_NODES = [
    {"node_id": "n1", "name": "Main Gate"},
    {"node_id": "n2", "name": "Library"},
    {"node_id": "n3", "name": "Block A"},
    {"node_id": "n4", "name": "Student Canteen"},
    {"node_id": "n5", "name": "Medical Center"}
]

# -----------------------------------
# System Prompt (Forcing Strict JSON)
# -----------------------------------
SYSTEM_PROMPT = f"""
You are an AI Incident Analyzer for a university campus.
Analyze the student's text and/or image report.

You MUST extract the incident details and map it to the closest physical location using ONLY the valid campus nodes provided below.

Valid Campus Nodes:
{json.dumps(CAMPUS_NODES, indent=2)}

Return ONLY a valid JSON object. Do not include markdown formatting or explanations. 
Use exactly this structure:

{{
    "location": "Extracted location name from text/image [AB,AB2,MPH,Special Block,etc]",
    "node_id": "The exact matching node_id from the valid nodes list (or 'UNKNOWN' if completely unclear)",
    "category": "Choose ONE: Construction, Water Leakage, Fire, Broken Lift, Blocked Corridor, Medical Emergency, Power Failure, Garbage, Other",
    "severity": "Choose ONE: Low, Medium, High, Critical",
    "short_summary": "Concise 1-sentence description of the hazard",
    "action_to_be_for_student": "This is the action reqiured for students do pass this issue"
    "action_to_be_for_admin":"Immediate operational action required by security or maintenance [AB,AB2,MPH,Special Block,etc]"
}}
"""


# -----------------------------------
# Endpoint
# -----------------------------------
@app.post("/analyze")
async def analyze(
    text: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None)
):
    # Validation: Ensure at least ONE input is provided
    if not text and not image:
        raise HTTPException(status_code=400, detail="You must provide either text or an image.")

    try:
        # Build the message content list
        content_parts = [{"type": "text", "text": text if text else "Analyze this image for hazards."}]

        # Set default model for Text-Only
        selected_model = "llama-3.3-70b-versatile" 

        # If image exists, convert to Base64, append it, and switch to the Vision model
        if image:
            image_bytes = await image.read()
            base64_image = base64.b64encode(image_bytes).decode('utf-8')
            mime_type = image.content_type or "image/jpeg"
            
            content_parts.append({
                "type": "image_url",
                "image_url": {
                    "url": f"data:{mime_type};base64,{base64_image}"
                }
            })
            
            selected_model = "llama-3.2-11b-vision-preview" # Switch to Groq's Vision model

        # Call Groq API
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": content_parts
                }
            ],
            model=selected_model,
            temperature=0.1, # Low temperature forces more strict formatting
        )

        # Extract the text response
        raw_response = chat_completion.choices[0].message.content.strip()

        # Clean up any potential Markdown wrapping that the LLM might add
        cleaned_response = raw_response.replace("```json", "").replace("```", "").strip()

        # Parse into a real Python dictionary
        parsed_data = json.loads(cleaned_response)

        return {
            "success": True,
            "model_used": selected_model,
            "data": parsed_data
        }

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail=f"AI returned invalid JSON. Raw output: {raw_response}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )