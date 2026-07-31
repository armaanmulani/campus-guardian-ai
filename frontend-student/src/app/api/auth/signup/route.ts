import { NextResponse } from "next/server";

const BACKEND_URL = "http://172.25.86.196:8080";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Next.js talks to your Java backend's register endpoint
    const targetUrl = `${BACKEND_URL}/api/v1/auth/register`;
    console.log("[FORWARDING_SIGNUP_TO]:", targetUrl);

    const backendResponse = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Sending name, email, and password to the backend
      body: JSON.stringify({ name, email, password }),
    });

    // Get response as text first to avoid JSON parse crashes
    const responseText = await backendResponse.text();
    console.log("[BACKEND_STATUS]:", backendResponse.status);

    let data;
    try {
      // If the response is empty (e.g., 200 OK with no body), default to a success message
      if (!responseText) {
        data = { message: "Success" };
      } else {
        data = JSON.parse(responseText);
      }
    } catch {
      // If backend returned non-JSON (like a 404 HTML page)
      return NextResponse.json(
        { error: `Backend error (Status: ${backendResponse.status}). Message: ${responseText}` },
        { status: backendResponse.status || 500 }
      );
    }

    return NextResponse.json(data, { status: backendResponse.status });

  } catch (error) {
    console.error("[SIGNUP_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to connect to authentication server" },
      { status: 500 }
    );
  }
}