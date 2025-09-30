// // src/app/api/auth/me/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { verifyToken } from '@/lib/auth';
// import { connectToDatabase } from '@/lib/db';
// import { getUserModel } from '@/models/user.model';

// export async function GET(request: NextRequest) {
//   try {
//     await connectToDatabase();

//     // Get token from cookie
//     const cookieHeader = request.headers.get('cookie');
//     const token = cookieHeader?.match(/adminToken=([^;]+)/)?.[1];

//     if (!token) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Not authenticated',
//           error: 'No token found',
//         },
//         { status: 401 }
//       );
//     }

//     // Verify token
//     const decoded = verifyToken(token);
    
//     // Find user in database
//     const User = getUserModel();
//     const user = await User.findById(decoded.id).select('-password -__v');

//     if (!user) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'User not found',
//           error: 'Invalid user',
//         },
//         { status: 404 }
//       );
//     }

//     if (!user.isActive) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Account deactivated',
//           error: 'Your account has been deactivated',
//         },
//         { status: 403 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: 'User authenticated successfully',
//       data: {
//         id: user._id.toString(),
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         profileImage: user.profileImage,
//         bio: user.bio,
//         socialLinks: user.socialLinks,
//         isActive: user.isActive,
//         lastLogin: user.lastLogin,
//         createdAt: user.createdAt,
//         updatedAt: user.updatedAt,
//       },
//     });

//   } catch (error) {
//     console.error('Me route error:', error);
    
//     // Clear invalid token cookie
//     const response = NextResponse.json(
//       {
//         success: false,
//         message: 'Authentication failed',
//         error: 'Invalid or expired token',
//       },
//       { status: 401 }
//     );

//     // Clear the invalid token
//     response.headers.set('Set-Cookie', 'adminToken=; Path=/; HttpOnly; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
    
//     return response;
//   }
// }








// src/app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { getUserModel } from '@/models/user.model';
import { clearTokenCookie } from '@/lib/auth';
import { Types } from 'mongoose';

interface UserResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    role: string;
    profileImage?: string;
    bio?: string;
    socialLinks?: {
      twitter?: string;
      facebook?: string;
      instagram?: string;
      linkedin?: string;
    };
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
  };
  error?: string;
}

export async function GET(request: NextRequest): Promise<NextResponse<UserResponse>> {
  try {
    await connectToDatabase();

    // Get token from cookie
    const cookieHeader = request.headers.get('cookie');
    const token = cookieHeader?.match(/adminToken=([^;]+)/)?.[1];

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Not authenticated',
          error: 'No authentication token found',
        },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = verifyToken(token);
    
    // Find user in database
    const User = getUserModel();
    const user = await User.findById(decoded.id).select('-password -__v');

    if (!user) {
      // Clear invalid token since user doesn't exist
      const response = NextResponse.json(
        {
          success: false,
          message: 'User not found',
          error: 'User account no longer exists',
        },
        { status: 404 }
      );
      response.headers.set('Set-Cookie', clearTokenCookie());
      return response;
    }

    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: 'Account deactivated',
          error: 'Your account has been deactivated',
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User authenticated successfully',
      data: {
        id: (user._id as Types.ObjectId).toString(), // Fixed: Convert ObjectId to string
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        socialLinks: user.socialLinks,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

  } catch (error) {
    console.error('Me route error:', error);
    
    // Clear invalid token cookie
    const response = NextResponse.json(
      {
        success: false,
        message: 'Authentication failed',
        error: 'Invalid or expired authentication token',
      },
      { status: 401 }
    );

    response.headers.set('Set-Cookie', clearTokenCookie());
    return response;
  }
}