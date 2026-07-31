import { NextResponse } from "next/server";

const BACKEND_URL = "http://172.25.174.105:8080";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    const targetUrl = `${BACKEND_URL}/api/v1/auth/register`;
    console.log("[FORWARDING_SIGNUP_TO]:", targetUrl);

    const backendResponse = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: name,      // Spring expects fullName
        email,
        password,
        role: "STUDENT",     // Hardcoded role
      }),
    });

    const responseText = await backendResponse.text();
    console.log("[BACKEND_STATUS]:", backendResponse.status);

    let data;

    try {
      data = responseText ? JSON.parse(responseText) : { message: "Success" };
    } catch {
      return NextResponse.json(
        {
          error: `Backend error (Status: ${backendResponse.status}). Message: ${responseText}`,
        },
        { status: backendResponse.status || 500 }
      );
    }

    return NextResponse.json(data, {
      status: backendResponse.status,
    });

  } catch (error) {
    console.error("[SIGNUP_ERROR]", error);

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