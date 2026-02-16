import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Function to redirect when the backend is unavailable
async function checkBackendServerAvailability() {
  try {
    const response = await fetch(`${process.env.API_URL}/api/health`, {
      method: "GET",
    });
    return response.status === 200; // backend is available
  } catch (error) {
    throw new Error("Backend server is not available");
  }
}

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  // Allow all paths to be accessible - coming soon disabled
  return NextResponse.next();
}
