import { NextResponse } from "next/server";
import axios from "axios";

// Fetches the course data based on the course ID passed as a query parameter
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    const response = await axios.get(
     
    );
    
    return NextResponse.json(response.data); // Respond with the fetched data
  } catch (error) {
    console.error("Error fetching course data:", error);
    return NextResponse.json(
      { error: "Failed to fetch course data" },
      { status: 500 }
    );
  }
}
