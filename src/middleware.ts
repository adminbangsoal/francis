import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Function to check backend server availability
async function checkBackendServerAvailability() {
  try {
    const response = await fetch(`${process.env.API_URL}/api/health`, {
      method: "GET",
      cache: "no-store", // Disable caching to get fresh status
    });
    return response.status === 200; // backend is available
  } catch (error) {
    return false; // backend is not available
  }
}

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  const { pathname } = request.nextUrl;

  // Exclude static assets, API routes, and Next.js internal routes from maintenance check
  const shouldSkip = 
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    pathname.includes(".") || // Files with extensions (favicon.ico, etc.)
    pathname === "/maintenance";

  if (shouldSkip) {
    return NextResponse.next();
  }

  // Check backend availability
  const isBackendAvailable = await checkBackendServerAvailability();

  // If backend is down, redirect to maintenance page for ALL paths
  if (!isBackendAvailable) {
    const maintenanceUrl = new URL("/maintenance", request.url);
    return NextResponse.redirect(maintenanceUrl);
  }

  // Backend is available, proceed normally
  return NextResponse.next();
}
