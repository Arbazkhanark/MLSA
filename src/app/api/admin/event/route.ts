import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getEventModel } from '@/models/event.model';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/admin/events - Get all events
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const type = searchParams.get('type') || '';

    // Build filter object
    const filter: any = {};
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { organizer: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (type) {
      filter.type = type;
    }

    const Event = getEventModel();
    const events = await Event.find(filter)
      .sort({ date: 1, time: 1 })
      .select('-__v')
      .lean();

    return NextResponse.json({
      success: true,
      data: events,
      total: events.length
    });
  } catch (error) {
    console.error('Get events error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch events',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// POST /api/admin/events - Create new event
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
      time,
      location,
      type,
      status = 'upcoming',
      maxAttendees,
      registrationUrl,
      tags,
      organizer,
      image
    } = body;

    // Validation
    if (!title || !description || !date || !time || !location || !maxAttendees || !registrationUrl || !organizer) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: 'All required fields must be provided',
        },
        { status: 400 }
      );
    }

    const Event = getEventModel();

    // Get user ID from middleware headers
    const userId = request.headers.get('x-user-id');

    // Create new event
    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      type,
      status,
      maxAttendees: Number(maxAttendees),
      currentAttendees: 0,
      registrationUrl,
      image: image || '/images/default-event.jpg',
      tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
      organizer,
      createdBy: userId
    });

    await event.save();

    return NextResponse.json({
      success: true,
      message: 'Event created successfully',
      data: event
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create event error:', error);
    
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
        message: 'Failed to create event',
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}