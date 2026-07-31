import { NextResponse } from "next/server";

const BACKEND_URL = "http://172.25.86.196:8080";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Next.js talks to your Java backend's login endpoint
    // NOTE: Change "/login" to "/authenticate" if that is what your Spring Boot backend uses
    const targetUrl = `${BACKEND_URL}/api/v1/auth/login`; 
    console.log("[FORWARDING_LOGIN_TO]:", targetUrl);

    const backendResponse = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Login usually only requires email and password
      body: JSON.stringify({ email, password }),
    });

    // Get response as text first to avoid JSON parse crashes
    const responseText = await backendResponse.text();
    console.log("[BACKEND_STATUS]:", backendResponse.status);

    let data;
    try {
      if (!responseText) {
        data = { message: "Success" };
      } else {
        data = JSON.parse(responseText);
      }
    } catch {
      // If backend returned non-JSON
      return NextResponse.json(
        { error: `Backend error (Status: ${backendResponse.status}). Message: ${responseText}` },
        { status: backendResponse.status || 500 }
      );
    }

    return NextResponse.json(data, { status: backendResponse.status });

  } catch (error) {
    console.error("[LOGIN_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to connect to authentication server" },
      { status: 500 }
    );
  }
}