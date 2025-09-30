// import { connectToDatabase } from '@/lib/db';
// import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
// import { getMomentModel } from '@/models/moment.model';
// import { NextRequest, NextResponse } from 'next/server';

// // GET /api/admin/moments - Get all moments
// // GET /api/moments - Get moments for public
// export async function GET(request: NextRequest) {
//   try {
//     await connectToDatabase();

//     const { searchParams } = new URL(request.url);
//     const search = searchParams.get('search') || '';
//     const category = searchParams.get('category') || '';
//     const featured = searchParams.get('featured') || '';
//     const sortBy = searchParams.get('sortBy') || 'date';
//     const sortOrder = searchParams.get('sortOrder') || 'desc';
//     const limit = parseInt(searchParams.get('limit') || '12');

//     // Build filter object
//     const filter: any = {};

//     if (search) {
//       filter.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } },
//         { tags: { $in: [new RegExp(search, 'i')] } },
//         { location: { $regex: search, $options: 'i' } }
//       ];
//     }

//     if (category && category !== 'all') {
//       filter.category = category;
//     }

//     if (featured === 'true') {
//       filter.featured = true;
//     }

//     // Build sort object
//     const sort: any = {};
//     sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

//     const Moment = getMomentModel();
//     const moments = await Moment.find(filter)
//       .sort(sort)
//       .limit(limit)
//       .select('-__v -createdBy -updatedAt')
//       .lean();

//     // Get featured moments separately if not already filtered
//     let featuredMoments: any[] = [];
//     if (featured !== 'true') {
//       featuredMoments = await Moment.find({ featured: true })
//         .sort({ date: -1 })
//         .limit(6)
//         .select('-__v -createdBy -updatedAt')
//         .lean();
//     }

//     return NextResponse.json({
//       success: true,
//       data: moments,
//       featured: featuredMoments,
//       total: moments.length
//     });
//   } catch (error) {
//     console.error('Get public moments error:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch moments',
//         error: 'Internal server error',
//       },
//       { status: 500 }
//     );
//   }
// }

// // POST /api/admin/moments - Create new moment
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
//       location,
//       category,
//       participants,
//       tags,
//       featured = false,
//       image
//     } = body;

//     // Validation
//     if (!title || !description || !date || !location) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Validation failed',
//           error: 'Required fields: title, description, date, location',
//         },
//         { status: 400 }
//       );
//     }

//     const Moment = getMomentModel();

//     // Get user info from middleware headers
//     const userId = request.headers.get('x-user-id');
//     const userEmail = request.headers.get('x-user-email');

//     // Create new moment
//     const moment = new Moment({
//       title,
//       description,
//       date,
//       location,
//       category: category || 'community',
//       image: image || '/images/default-moment.jpg',
//       participants: Array.isArray(participants) ? participants : (participants || '').split(',').map((p: string) => p.trim()).filter(Boolean),
//       likes: 0,
//       featured,
//       tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
//       addedBy: userEmail || 'Admin',
//       addedDate: new Date().toISOString().split('T')[0],
//       createdBy: userId
//     });

//     await moment.save();

//     return NextResponse.json({
//       success: true,
//       message: 'Moment created successfully',
//       data: moment
//     }, { status: 201 });

//   } catch (error: any) {
//     console.error('Create moment error:', error);

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
//         message: 'Failed to create moment',
//         error: error.message || 'Internal server error',
//       },
//       { status: 500 }
//     );
//   }
// }











// import { connectToDatabase } from '@/lib/db';
// import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
// import { getMomentModel } from '@/models/moment.model';
// import { NextRequest, NextResponse } from 'next/server';
// import mongoose from 'mongoose';

// // Define interfaces for better type safety
// interface FilterCriteria {
//   $or?: Array<{
//     [key: string]: { $regex: string; $options: string } | { $in: RegExp[] };
//   }>;
//   category?: string;
//   featured?: boolean;
// }

// interface SortCriteria {
//   [key: string]: 1 | -1;
// }

// interface MomentData {
//   title: string;
//   description: string;
//   date: string;
//   location: string;
//   category?: string;
//   participants?: string[] | string;
//   tags?: string[] | string;
//   featured?: boolean;
//   image?: string;
// }

// // GET /api/admin/moments - Get all moments
// // GET /api/moments - Get moments for public
// export async function GET(request: NextRequest) {
//   try {
//     await connectToDatabase();

//     const { searchParams } = new URL(request.url);
//     const search = searchParams.get('search') || '';
//     const category = searchParams.get('category') || '';
//     const featured = searchParams.get('featured') || '';
//     const sortBy = searchParams.get('sortBy') || 'date';
//     const sortOrder = searchParams.get('sortOrder') || 'desc';
//     const limit = parseInt(searchParams.get('limit') || '12');

//     // Build filter object with proper typing
//     const filter: FilterCriteria = {};

//     if (search) {
//       filter.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } },
//         { tags: { $in: [new RegExp(search, 'i')] } },
//         { location: { $regex: search, $options: 'i' } }
//       ];
//     }

//     if (category && category !== 'all') {
//       filter.category = category;
//     }

//     if (featured === 'true') {
//       filter.featured = true;
//     }

//     // Build sort object with proper typing
//     const sort: SortCriteria = {};
//     sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

//     const Moment = getMomentModel();
//     const moments = await Moment.find(filter)
//       .sort(sort)
//       .limit(limit)
//       .select('-__v -createdBy -updatedAt')
//       .lean();

//     // Get featured moments separately if not already filtered
//     let featuredMoments: mongoose.Document[] = [];
//     if (featured !== 'true') {
//       featuredMoments = await Moment.find({ featured: true })
//         .sort({ date: -1 })
//         .limit(6)
//         .select('-__v -createdBy -updatedAt')
//         .lean();
//     }

//     return NextResponse.json({
//       success: true,
//       data: moments,
//       featured: featuredMoments,
//       total: moments.length
//     });
//   } catch (error: unknown) {
//     console.error('Get public moments error:', error);

//     const errorMessage = error instanceof Error ? error.message : 'Internal server error';

//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch moments',
//         error: errorMessage,
//       },
//       { status: 500 }
//     );
//   }
// }

// // POST /api/admin/moments - Create new moment
// export async function POST(request: NextRequest) {
//   // Apply admin auth middleware
//   const authResponse = await adminAuthMiddleware(request);
//   if (authResponse.status !== 200) {
//     return authResponse;
//   }

//   try {
//     await connectToDatabase();

//     const body: MomentData = await request.json();
//     const {
//       title,
//       description,
//       date,
//       location,
//       category,
//       participants,
//       tags,
//       featured = false,
//       image
//     } = body;

//     // Validation
//     const requiredFields = ['title', 'description', 'date', 'location'];
//     const missingFields = requiredFields.filter(field => !body[field as keyof MomentData]);

//     if (missingFields.length > 0) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Validation failed',
//           error: `Missing required fields: ${missingFields.join(', ')}`,
//         },
//         { status: 400 }
//       );
//     }

//     const Moment = getMomentModel();

//     // Get user info from middleware headers
//     const userId = request.headers.get('x-user-id');
//     const userEmail = request.headers.get('x-user-email');

//     // Process participants array
//     const processedParticipants = Array.isArray(participants) 
//       ? participants 
//       : (participants || '').split(',').map((p: string) => p.trim()).filter(Boolean);

//     // Process tags array
//     const processedTags = Array.isArray(tags) 
//       ? tags 
//       : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean);

//     // Create new moment
//     const moment = new Moment({
//       title,
//       description,
//       date,
//       location,
//       category: category || 'community',
//       image: image || '/images/default-moment.jpg',
//       participants: processedParticipants,
//       likes: 0,
//       featured,
//       tags: processedTags,
//       addedBy: userEmail || 'Admin',
//       addedDate: new Date().toISOString().split('T')[0],
//       createdBy: userId
//     });

//     await moment.save();

//     return NextResponse.json({
//       success: true,
//       message: 'Moment created successfully',
//       data: moment
//     }, { status: 201 });

//   } catch (error: unknown) {
//     console.error('Create moment error:', error);

//     if (error instanceof mongoose.Error.ValidationError) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Validation failed',
//           error: error.message,
//         },
//         { status: 400 }
//       );
//     }

//     const errorMessage = error instanceof Error ? error.message : 'Internal server error';

//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to create moment',
//         error: errorMessage,
//       },
//       { status: 500 }
//     );
//   }
// }
















import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getMomentModel } from '@/models/moment.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Define enums for better type safety
enum MomentCategory {
    COMMUNITY = 'community',
    EVENT = 'event',
    WORKSHOP = 'workshop',
    SOCIAL = 'social',
    ACHIEVEMENT = 'achievement'
}

enum SortField {
    DATE = 'date',
    TITLE = 'title',
    LIKES = 'likes'
}

// Define interfaces for better type safety
interface SearchCondition {
    [key: string]: { $regex: string; $options: string } | { $in: RegExp[] };
}

interface FilterCriteria {
    $or?: SearchCondition[];
    category?: MomentCategory | string;
    featured?: boolean;
}

interface SortCriteria {
    [key: string]: 1 | -1;
}

interface MomentData {
    title: string;
    description: string;
    date: string;
    location: string;
    category?: MomentCategory | string;
    participants?: string[] | string;
    tags?: string[] | string;
    featured?: boolean;
    image?: string;
}

// GET /api/admin/moments - Get all moments
// GET /api/moments - Get moments for public
export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const category = searchParams.get('category') || '';
        const featured = searchParams.get('featured') || '';
        const sortBy = searchParams.get('sortBy') || SortField.DATE;
        const sortOrder = searchParams.get('sortOrder') || 'desc';
        const limit = Math.min(parseInt(searchParams.get('limit') || '12'), 50); // Limit to 50 max

        // Build filter object with proper typing
        const filter: FilterCriteria = {};

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $in: [searchRegex] } },
                { location: { $regex: search, $options: 'i' } }
            ];
        }

        if (category && category !== 'all') {
            filter.category = category;
        }

        if (featured === 'true') {
            filter.featured = true;
        }

        // Build sort object with proper typing
        const sort: SortCriteria = {};
        const validSortFields = [SortField.DATE, SortField.TITLE, SortField.LIKES];
        const actualSortBy = validSortFields.includes(sortBy as SortField) ? sortBy : SortField.DATE;
        sort[actualSortBy] = sortOrder === 'desc' ? -1 : 1;

        const Moment = getMomentModel();
        const moments = await Moment.find(filter)
            .sort(sort)
            .limit(limit)
            .select('-__v -createdBy -updatedAt')
            .lean();

        // Get featured moments separately if not already filtered
        let featuredMoments: mongoose.Document[] = [];
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
    } catch (error: unknown) {
        console.error('Get public moments error:', error);

        const errorMessage = error instanceof Error ? error.message : 'Internal server error';

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch moments',
                error: errorMessage,
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

        const body: MomentData = await request.json();
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

        // Enhanced validation
        const requiredFields = [
            { field: 'title', name: 'Title' },
            { field: 'description', name: 'Description' },
            { field: 'date', name: 'Date' },
            { field: 'location', name: 'Location' }
        ];

        const missingFields = requiredFields
            .filter(({ field }) => !body[field as keyof MomentData])
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
        const momentDate = new Date(date);
        if (isNaN(momentDate.getTime())) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Validation failed',
                    error: 'Invalid date format',
                },
                { status: 400 }
            );
        }

        const Moment = getMomentModel();

        // Get user info from middleware headers
        const userId = request.headers.get('x-user-id');
        const userEmail = request.headers.get('x-user-email');

        // Process participants array
        const processedParticipants = Array.isArray(participants)
            ? participants
            : (participants || '').split(',').map((p: string) => p.trim()).filter(Boolean);

        // Process tags array
        const processedTags = Array.isArray(tags)
            ? tags
            : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean);

        // Create new moment
        const moment = new Moment({
            title,
            description,
            date,
            location,
            category: category || MomentCategory.COMMUNITY,
            image: image || '/images/default-moment.jpg',
            participants: processedParticipants,
            likes: 0,
            featured: Boolean(featured),
            tags: processedTags,
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

    } catch (error: unknown) {
        console.error('Create moment error:', error);

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
                message: 'Failed to create moment',
                error: errorMessage,
            },
            { status: 500 }
        );
    }
}