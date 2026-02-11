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
  // if root path, just return next
  if (request.url === "/") {
    return NextResponse.next();
  }

  // Handle the /try-out redirect synchronously
  if (request.url.includes("/try-out")) {
    return NextResponse.redirect(
      new URL("https://tryout.bangsoal.co.id", request.url),
    );
  }

  const excludePaths = [
    "/maintenance",
    "_next/static",
    "manifest",
    "icon",
    "bg-mesh-horizontal.webp",
  ];

  const shouldSkip = excludePaths.some((path) => request.url.includes(path));

  if (request.url.includes("/maintenance")) {
    try {
      if (!process.env.NEXT_PUBLIC_IS_MAINTENANCE) {
        const available = await checkBackendServerAvailability(); // Ensure this is awaited

        if (available) {
          return NextResponse.redirect(
            new URL(`${process.env.BASE_URL}/dashboard`, request.url),
            {
              status: 303,
            },
          );
        }
      } else {
        return NextResponse.next();
      }
    } catch (error) {
      console.error("Error checking backend server availability");
      return NextResponse.next();
    }
  }

  // Avoid redirecting the maintenance page to itself
  if (shouldSkip || request.headers.get("referrer")?.includes("/maintenance")) {
    return NextResponse.next();
  } else {
    try {
      const available = await checkBackendServerAvailability(); // Ensure this is awaited

      if (available) {
        return NextResponse.next();
      }
    } catch (error) {
      console.error("Error checking backend server availability");
      return NextResponse.redirect(
        new URL(`${process.env.BASE_URL}/maintenance`, request.url),
        {
          status: 303,
        },
      );
    }
  }

  return NextResponse.next();
}
