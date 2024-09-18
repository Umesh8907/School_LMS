import { NextResponse } from "next/server";
import axios from "axios";

// Fetches the course data from the external API
export async function GET() {
  try {
    const response = await axios.get(
      "https://infanoapi.pocapi.in/api/Course/GetById/66e6f0217a728766ffb88a70"
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
