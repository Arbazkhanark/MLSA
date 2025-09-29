import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getMomentModel } from '@/models/moment.model';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/admin/moments - Get all moments
// GET /api/moments - Get moments for public
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const featured = searchParams.get('featured') || '';
    const sortBy = searchParams.get('sortBy') || 'date';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const limit = parseInt(searchParams.get('limit') || '12');

    // Build filter object
    const filter: any = {};
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const Moment = getMomentModel();
    const moments = await Moment.find(filter)
      .sort(sort)
      .limit(limit)
      .select('-__v -createdBy -updatedAt')
      .lean();

    // Get featured moments separately if not already filtered
    let featuredMoments: any[] = [];
    if (featured !== 'true') {
      featuredMoments = await Moment.find({ featured: true })
        .sort({ date: -1 })
        .limit(6)
        .select('-__v -createdBy -updatedAt')
        .lean();
    }

    return NextResponse.json({
      success: true,
      data: moments,
      featured: featuredMoments,
      total: moments.length
    });
  } catch (error) {
    console.error('Get public moments error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch moments',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// POST /api/admin/moments - Create new moment
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
      date,
      location,
      category,
      participants,
      tags,
      featured = false,
      image
    } = body;

    // Validation
    if (!title || !description || !date || !location) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: 'Required fields: title, description, date, location',
        },
        { status: 400 }
      );
    }

    const Moment = getMomentModel();

    // Get user info from middleware headers
    const userId = request.headers.get('x-user-id');
    const userEmail = request.headers.get('x-user-email');

    // Create new moment
    const moment = new Moment({
      title,
      description,
      date,
      location,
      category: category || 'community',
      image: image || '/images/default-moment.jpg',
      participants: Array.isArray(participants) ? participants : (participants || '').split(',').map((p: string) => p.trim()).filter(Boolean),
      likes: 0,
      featured,
      tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
      addedBy: userEmail || 'Admin',
      addedDate: new Date().toISOString().split('T')[0],
      createdBy: userId
    });

    await moment.save();

    return NextResponse.json({
      success: true,
      message: 'Moment created successfully',
      data: moment
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create moment error:', error);
    
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
        message: 'Failed to create moment',
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}