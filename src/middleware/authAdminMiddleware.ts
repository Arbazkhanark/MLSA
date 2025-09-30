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














// // src/middleware/authAdminMiddleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { verifyToken } from '@/lib/auth';
// import { connectToDatabase } from '@/lib/db';
// import { getUserModel } from '@/models/user.model';

// export async function adminAuthMiddleware(request: NextRequest) {
//   try {
//     await connectToDatabase();

//     // Get token from cookie
//     const cookieHeader = request.headers.get('cookie');
//     const token = cookieHeader?.match(/adminToken=([^;]+)/)?.[1];

//     if (!token) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Authentication required',
//           error: 'No token provided',
//         },
//         { status: 401 }
//       );
//     }

//     // Verify token
//     const decoded = verifyToken(token);
    
//     // Find user and check if admin
//     const User = getUserModel();
//     const user = await User.findById(decoded.id);

//     if (!user || !user.isActive) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Invalid user',
//           error: 'User not found or inactive',
//         },
//         { status: 401 }
//       );
//     }

//     if (user.role !== 'admin') {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Access denied',
//           error: 'Admin privileges required',
//         },
//         { status: 403 }
//       );
//     }

//     // Add user info to headers for downstream use
//     const headers = new Headers(request.headers);
//     headers.set('x-user-id', user._id.toString());
//     headers.set('x-user-email', user.email);
//     headers.set('x-user-role', user.role);

//     return NextResponse.next({
//       request: {
//         headers,
//       },
//     });

//   } catch (error) {
//     console.error('Auth middleware error:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Authentication failed',
//         error: 'Invalid token',
//       },
//       { status: 401 }
//     );
//   }
// }