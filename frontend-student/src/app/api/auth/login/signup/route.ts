import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://172.25.86.196:8080/api/v1/auth/login";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    const formData = new FormData();
    formData.append("name", String(name || ""));
    formData.append("email", String(email || ""));
    formData.append("password", String(password || ""));

    const backendResponse = await fetch(`${BACKEND_URL}/api/auth/signup`, {
      method: "POST",
      body: formData,
    });

    const data = await backendResponse.json();

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("[SIGNUP_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to connect to authentication server" },
      { status: 500 }
    );
  }
}