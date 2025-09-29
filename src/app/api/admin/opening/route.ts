import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getOpeningModel } from '@/models/opening.model';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/admin/openings - Get all openings
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const type = searchParams.get('type') || '';
    const category = searchParams.get('category') || '';

    // Build filter object
    const filter: any = {};
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (type) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    const Opening = getOpeningModel();
    const openings = await Opening.find(filter)
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    return NextResponse.json({
      success: true,
      data: openings,
      total: openings.length
    });
  } catch (error) {
    console.error('Get openings error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch openings',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// POST /api/admin/openings - Create new opening
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
      title,
      description,
      requirements,
      responsibilities,
      qualifications,
      skills,
      type,
      category,
      location,
      deadline,
      status = 'active',
      maxApplications
    } = body;

    // Validation
    if (!title || !description || !location || !deadline || !maxApplications) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: 'Required fields: title, description, location, deadline, maxApplications',
        },
        { status: 400 }
      );
    }

    const Opening = getOpeningModel();

    // Get user ID from middleware headers
    const userId = request.headers.get('x-user-id');

    // Create new opening
    const opening = new Opening({
      title,
      description,
      requirements: Array.isArray(requirements) ? requirements : (requirements || '').split(',').map((r: string) => r.trim()).filter(Boolean),
      responsibilities: Array.isArray(responsibilities) ? responsibilities : (responsibilities || '').split(',').map((r: string) => r.trim()).filter(Boolean),
      qualifications: Array.isArray(qualifications) ? qualifications : (qualifications || '').split(',').map((q: string) => q.trim()).filter(Boolean),
      skills: Array.isArray(skills) ? skills : (skills || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      type: type || 'part-time',
      category: category || 'technical',
      location,
      deadline,
      status,
      maxApplications: Number(maxApplications),
      currentApplications: 0,
      createdBy: userId
    });

    await opening.save();

    return NextResponse.json({
      success: true,
      message: 'Opening created successfully',
      data: opening
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create opening error:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: error.message,
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create opening',
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}