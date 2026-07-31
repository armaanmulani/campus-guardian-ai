import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:8000";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Convert to FormData if your backend requires multipart/form-data
    const formData = new FormData();
    formData.append("email", String(email || ""));
    formData.append("password", String(password || ""));

    const backendResponse = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      body: formData, // Change to JSON.stringify({ email, password }) if backend uses JSON
    });

    const data = await backendResponse.json();

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("[LOGIN_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to connect to authentication server" },
      { status: 500 }
    );
  }
}