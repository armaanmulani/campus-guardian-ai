import { NextResponse } from "next/server";

const BACKEND_URL = "http://172.25.174.105:8080";

export async function POST(request: Request) {
  try {
    // Get request body from frontend
    const body = await request.json();
    const { email, password } = body;

    // Optional validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const targetUrl = `${BACKEND_URL}/api/v1/auth/login`;
    console.log("[FORWARDING_LOGIN_TO]:", targetUrl);

    const backendResponse = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseText = await backendResponse.text();

    console.log("[BACKEND_STATUS]:", backendResponse.status);
    console.log("[BACKEND_RESPONSE]:", responseText);

    let data;

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      data = { message: responseText };
    }

    return NextResponse.json(data, {
      status: backendResponse.status,
    });

  } catch (error) {
    console.error("[LOGIN_ERROR]", error);

    return NextResponse.json(
      {
        error: "Failed to connect to authentication server",
      },
      {
        status: 500,
      }
    );
  }
}