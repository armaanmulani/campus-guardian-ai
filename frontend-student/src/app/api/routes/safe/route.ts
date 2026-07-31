import { NextResponse } from "next/server";
import { MOCK_ROUTES } from "@/lib/mock-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.origin || !body.destination) {
      return NextResponse.json(
        { error: "Origin and destination are required" },
        { status: 400 }
      );
    }

    // In a real app, this would call a routing engine / AI service
    // For now, we simulate a small processing delay and return mock routes
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json(MOCK_ROUTES);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
