import { NextResponse } from "next/server";
import { MOCK_INCIDENTS } from "@/lib/mock-data";

// Simulated database (in-memory) for development
let incidentsDB = [...MOCK_INCIDENTS];

export async function GET() {
  // In a real app, this would be: await db.incidents.findMany({ where: { status: 'approved' } })
  const activeIncidents = incidentsDB.filter(
    (inc) => inc.status === "approved" || inc.status === "pending"
  );
  
  return NextResponse.json(activeIncidents);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.title || !body.description || !body.location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a real app, you would save to database here
    const newIncident = {
      id: `inc-${Date.now()}`,
      title: body.title,
      description: body.description,
      category: body.category,
      severity: "medium", // Default, reviewed by admin
      lat: 23.0796, // Default to campus center if GPS is unavailable
      lng: 76.8475,
      location: body.location,
      timestamp: new Date(),
      status: "pending",
      reportedBy: "student_anon", // Will link to session in future
    };

    incidentsDB = [newIncident, ...incidentsDB];

    return NextResponse.json(
      { message: "Incident reported successfully", incident: newIncident },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
