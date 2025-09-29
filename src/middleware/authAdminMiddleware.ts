import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function adminAuthMiddleware(request: NextRequest) {
  const token = request.cookies.get('adminToken')?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Authentication required', error: 'No token provided' },
      { status: 401 }
    );
  }

  try {
    const decoded = verifyToken(token);
    
    // Check if user has admin role
    if (decoded.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Access denied', error: 'Admin privileges required' },
        { status: 403 }
      );
    }

    // Add user info to request headers for use in API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.id);
    requestHeaders.set('x-user-role', decoded.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid token', error: 'Token verification failed' },
      { status: 401 }
    );
  }
}