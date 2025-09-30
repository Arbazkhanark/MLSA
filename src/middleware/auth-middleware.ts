import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define routes that require authentication
const protectedRoutes = ['/admin/dashboard', '/admin/team', '/admin/events', '/admin/applications', '/admin/content'];
const authRoutes = ['/admin/login'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get token from cookie
    const token = request.cookies.get('adminToken')?.value;

    // Check if the route is protected
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    // Redirect logic for authenticated users on auth routes
    if (isAuthRoute && token) {
        try {
            verifyToken(token);
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        } catch (error) {
            // Token is invalid, allow access to auth route
        }
    }

    // Check for protected routes
    if (isProtectedRoute) {
        if (!token) {
            const loginUrl = new URL('/admin/login', request.url);
            loginUrl.searchParams.set('from', pathname);
            return NextResponse.redirect(loginUrl);
        }

        try {
            const decoded = verifyToken(token);

            // Check if user has admin role
            if (decoded.role !== 'admin') {
                const loginUrl = new URL('/admin/login', request.url);
                loginUrl.searchParams.set('error', 'access_denied');
                return NextResponse.redirect(loginUrl);
            }

            // Token is valid and user is admin, continue to protected route
            return NextResponse.next();
        } catch (error) {
            // Token is invalid, redirect to login
            const loginUrl = new URL('/admin/login', request.url);
            loginUrl.searchParams.set('from', pathname);
            loginUrl.searchParams.set('error', 'session_expired');

            const response = NextResponse.redirect(loginUrl);
            response.cookies.delete('adminToken');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};