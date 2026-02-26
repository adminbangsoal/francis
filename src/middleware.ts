import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

// List of admin emails that should be redirected to admin dashboard
const ADMIN_EMAILS = [
  'alisyageza24@gmail.com',
  'admin@bangsoal.co.id',
  'joseph.srgh@gmail.com'
];

// Function to redirect when the backend is unavailable
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

  // Skip admin paths - let them pass through
  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Check if user has admin token in cookies
  const adminToken = request.cookies.get('admin_token');
  const userToken = request.cookies.get('token');
  
  if (adminToken || userToken) {
    try {
      // Get user info from API to check if admin
      const response = await fetch(`${process.env.API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken?.value || adminToken?.value}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const userEmail = data.data?.user?.email;
        
        // If user is admin and not already on admin page, redirect to admin
        if (ADMIN_EMAILS.includes(userEmail) && !pathname.startsWith('/admin')) {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  }

  // Allow all other paths
  return NextResponse.next();
}
