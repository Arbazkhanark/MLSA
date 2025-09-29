import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, generateToken, setTokenCookie } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { getUserModel } from '@/models/user.model';
import { Types } from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { name, email, password, role = 'user' } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: 'All fields are required',
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: 'Password must be at least 6 characters long',
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const User=getUserModel();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'Registration failed',
          error: 'User with this email already exists',
        },
        { status: 409 }
      );
    }

    // Create new user
    const hashedPassword = await hashPassword(password);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      isActive: true,
    });

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
      message: 'User registered successfully',
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
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Registration failed',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}