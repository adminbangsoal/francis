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
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Allow landing page (/) to always be accessible without backend check
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Allow maintenance page to be accessible
  if (pathname === "/maintenance") {
    return NextResponse.next();
  }

  // Allow coming-soon page to be accessible
  if (pathname === "/coming-soon") {
    return NextResponse.next();
  }

  // Allow static assets and Next.js internal files
  const excludePaths = [
    "_next/static",
    "_next/image",
    "_next/webpack",
    "manifest",
    "icon",
    ".webp",
    ".svg",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".ico",
    ".woff",
    ".woff2",
    ".ttf",
    ".eot",
  ];

  const shouldSkip = excludePaths.some(
    (path) => pathname.includes(path) || request.url.includes(path),
  );

  if (shouldSkip) {
    return NextResponse.next();
  }

  // For all other paths, redirect to coming-soon
  // Only landing page should be accessible
  const baseUrl = process.env.BASE_URL || url.origin;
  return NextResponse.redirect(new URL("/coming-soon", baseUrl), {
    status: 303,
  });
}
