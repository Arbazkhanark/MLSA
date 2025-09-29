import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getTeamMemberModel } from '@/models/team-member.model';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/team - Get all team members
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    const status = searchParams.get('status') || '';

    // Build filter object
    const filter: any = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (role) {
      filter.role = role;
    }

    if (status) {
      filter.status = status;
    }

    const TeamMember=getTeamMemberModel();
    const teamMembers = await TeamMember.find(filter)
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    return NextResponse.json({
      success: true,
      data: teamMembers,
      total: teamMembers.length
    });
  } catch (error) {
    console.error('Get team members error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch team members',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// POST /api/team - Create new team member
export async function POST(request: NextRequest) {
  // Apply admin auth middleware
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse.status !== 200) {
    return authResponse;
  }

  try {
    await connectToDatabase();

    const body = await request.json();
    const {
      name,
      role,
      position,
      email,
      bio,
      skills,
      location,
      joinDate,
      status = 'active',
      avatar,
      social
    } = body;

    // Validation
    if (!name || !role || !position || !email || !bio || !location) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: 'Required fields are missing',
        },
        { status: 400 }
      );
    }

    // Check if team member already exists with this email
    const TeamMember=getTeamMemberModel();
    const existingMember = await TeamMember.findOne({ email });
    if (existingMember) {
      return NextResponse.json(
        {
          success: false,
          message: 'Team member already exists',
          error: 'A team member with this email already exists',
        },
        { status: 409 }
      );
    }

    // Get user ID from middleware headers
    const userId = request.headers.get('x-user-id');

    // Create new team member
    const teamMember = new TeamMember({
      name,
      role,
      position,
      email,
      bio,
      skills: Array.isArray(skills) ? skills : skills.split(',').map((s: string) => s.trim()),
      location,
      joinDate: joinDate || new Date().toISOString().split('T')[0],
      status,
      avatar: avatar || '/images/default-avatar.png',
      social: social || {},
      createdBy: userId
    });

    await teamMember.save();

    return NextResponse.json({
      success: true,
      message: 'Team member created successfully',
      data: teamMember
    }, { status: 201 });

  } catch (error) {
    console.error('Create team member error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create team member',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}