import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, generateToken, setTokenCookie } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { getUserModel } from '@/models/user.model';
import { Types } from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Login failed',
          error: 'Email and password are required',
        },
        { status: 400 }
      );
    }

    // Find user
    const User=getUserModel();
    const user = await User.findOne({ email });
    console.log(user,"user------")
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Login failed',
          error: 'Invalid credentials',
        },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Login failed',
          error: 'Invalid credentials',
        },
        { status: 401 }
      );
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken({
      id: (user._id as Types.ObjectId).toString(),
      email: user.email,
      role: user.role,
    });

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        id: (user._id as Types.ObjectId).toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });

    response.headers.set('Set-Cookie', setTokenCookie(token));

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Login failed',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}