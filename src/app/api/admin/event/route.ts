// import { connectToDatabase } from '@/lib/db';
// import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
// import { getEventModel } from '@/models/event.model';
// import { NextRequest, NextResponse } from 'next/server';

// // GET /api/admin/events - Get all events
// export async function GET(request: NextRequest) {
//   try {
//     await connectToDatabase();

//     const { searchParams } = new URL(request.url);
//     const search = searchParams.get('search') || '';
//     const status = searchParams.get('status') || '';
//     const type = searchParams.get('type') || '';

//     // Build filter object
//     const filter: any = {};
    
//     if (search) {
//       filter.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } },
//         { organizer: { $regex: search, $options: 'i' } },
//         { tags: { $in: [new RegExp(search, 'i')] } }
//       ];
//     }

//     if (status && status !== 'all') {
//       filter.status = status;
//     }

//     if (type) {
//       filter.type = type;
//     }

//     const Event = getEventModel();
//     const events = await Event.find(filter)
//       .sort({ date: 1, time: 1 })
//       .select('-__v')
//       .lean();

//     return NextResponse.json({
//       success: true,
//       data: events,
//       total: events.length
//     });
//   } catch (error) {
//     console.error('Get events error:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch events',
//         error: 'Internal server error',
//       },
//       { status: 500 }
//     );
//   }
// }

// // POST /api/admin/events - Create new event
// export async function POST(request: NextRequest) {
//   // Apply admin auth middleware
//   const authResponse = await adminAuthMiddleware(request);
//   if (authResponse.status !== 200) {
//     return authResponse;
//   }

//   try {
//     await connectToDatabase();

//     const body = await request.json();
//     const {
//       title,
//       description,
//       date,
//       time,
//       location,
//       type,
//       status = 'upcoming',
//       maxAttendees,
//       registrationUrl,
//       tags,
//       organizer,
//       image
//     } = body;

//     // Validation
//     if (!title || !description || !date || !time || !location || !maxAttendees || !registrationUrl || !organizer) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Validation failed',
//           error: 'All required fields must be provided',
//         },
//         { status: 400 }
//       );
//     }

//     const Event = getEventModel();

//     // Get user ID from middleware headers
//     const userId = request.headers.get('x-user-id');

//     // Create new event
//     const event = new Event({
//       title,
//       description,
//       date,
//       time,
//       location,
//       type,
//       status,
//       maxAttendees: Number(maxAttendees),
//       currentAttendees: 0,
//       registrationUrl,
//       image: image || '/images/default-event.jpg',
//       tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
//       organizer,
//       createdBy: userId
//     });

//     await event.save();

//     return NextResponse.json({
//       success: true,
//       message: 'Event created successfully',
//       data: event
//     }, { status: 201 });

//   } catch (error: any) {
//     console.error('Create event error:', error);
    
//     if (error.name === 'ValidationError') {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Validation failed',
//           error: error.message,
//         },
//         { status: 400 }
//       );
//     }
    
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to create event',
//         error: error.message || 'Internal server error',
//       },
//       { status: 500 }
//     );
//   }
// }















import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getEventModel } from '@/models/event.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Define more specific interfaces
interface SearchCondition {
  [key: string]: { $regex: string; $options: string } | { $in: RegExp[] };
}

interface FilterCriteria {
  $or?: SearchCondition[];
  status?: string;
  type?: string;
}

interface EventData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  maxAttendees: number | string;
  registrationUrl: string;
  tags?: string[] | string;
  organizer: string;
  image?: string;
}

// GET /api/admin/events - Get all events
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const type = searchParams.get('type') || '';

    // Build filter object with proper typing
    const filter: FilterCriteria = {};
    
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { organizer: { $regex: search, $options: 'i' } },
        { tags: { $in: [searchRegex] } }
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
  } catch (error: unknown) {
    console.error('Get events error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch events',
        error: errorMessage,
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

    const body: EventData = await request.json();
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

    // Enhanced validation
    const requiredFields = [
      { field: 'title', name: 'Title' },
      { field: 'description', name: 'Description' },
      { field: 'date', name: 'Date' },
      { field: 'time', name: 'Time' },
      { field: 'location', name: 'Location' },
      { field: 'maxAttendees', name: 'Maximum Attendees' },
      { field: 'registrationUrl', name: 'Registration URL' },
      { field: 'organizer', name: 'Organizer' }
    ];

    const missingFields = requiredFields
      .filter(({ field }) => !body[field as keyof EventData])
      .map(({ name }) => name);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: `Missing required fields: ${missingFields.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Validate date format
    const eventDate = new Date(date);
    if (isNaN(eventDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: 'Invalid date format',
        },
        { status: 400 }
      );
    }

    // Validate maxAttendees
    const maxAttendeesNum = Number(maxAttendees);
    if (isNaN(maxAttendeesNum) || maxAttendeesNum <= 0 || !Number.isInteger(maxAttendeesNum)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: 'Maximum attendees must be a positive integer',
        },
        { status: 400 }
      );
    }

    const Event = getEventModel();

    // Get user ID from middleware headers
    const userId = request.headers.get('x-user-id');

    // Process tags array
    const processedTags = Array.isArray(tags) 
      ? tags 
      : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean);

    // Create new event
    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      type,
      status,
      maxAttendees: maxAttendeesNum,
      currentAttendees: 0,
      registrationUrl,
      image: image || '/images/default-event.jpg',
      tags: processedTags,
      organizer,
      createdBy: userId
    });

    await event.save();

    return NextResponse.json({
      success: true,
      message: 'Event created successfully',
      data: event
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Create event error:', error);
    
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: error.message,
        },
        { status: 400 }
      );
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create event',
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}