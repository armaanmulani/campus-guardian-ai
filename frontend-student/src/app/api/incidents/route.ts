import { NextResponse } from "next/server";

const MIDDLEWARE_URL =
  process.env.MIDDLEWARE_URL ||
  "http://172.25.44.70:8000/api/v1/incidents/report";

console.log("Route file loaded");

export async function POST(request: Request) {
  console.log("========== POST ROUTE HIT ==========");

  try {
    const body = await request.json();
    console.log("Received body:", body);

    // rest of your code...

    // 2. Extract strictly title, description, and incident type
    const title = body.title || "";
    const description = body.description || "";
    // Checks common frontend keys for category/type
    const incidentType = body.category || body.incidentType || body.type || body.incident_type || "";

    // 3. Build FormData with ONLY these three fields
    const formData = new FormData();
    formData.append("title", String(title));
    formData.append("description", String(description));
    formData.append("incident_type", String(incidentType)); // Adjust field key if your middleware expects e.g. "incidentType" or "category"

    // 4. Forward to middleware
    const middlewareResponse = await fetch(MIDDLEWARE_URL, {
    method: "POST",
    headers: {
    "x-user-id": "student123",
  },
  body: formData,
});

    const text = await middlewareResponse.text();

console.log("Middleware Response:", text);

let data;

try {
  data = JSON.parse(text);
} catch {
  data = { message: text };
}

console.log("Status:", middlewareResponse.status);

return NextResponse.json(data, {
  status: middlewareResponse.status,
});

    return NextResponse.json(data, { status: middlewareResponse.status });
  } catch (error) {
    console.error("[MIDDLEWARE_FORWARD_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to communicate with safety middleware service" },
      { status: 500 }
    );
  }
}