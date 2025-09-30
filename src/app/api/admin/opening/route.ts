// import { connectToDatabase } from '@/lib/db';
// import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
// import { getOpeningModel } from '@/models/opening.model';
// import mongoose from 'mongoose';
// import { NextRequest, NextResponse } from 'next/server';

// // GET /api/admin/openings - Get all openings
// export async function GET(request: NextRequest) {
//     try {
//         await connectToDatabase();

//         const { searchParams } = new URL(request.url);
//         const search = searchParams.get('search') || '';
//         const status = searchParams.get('status') || '';
//         const type = searchParams.get('type') || '';
//         const category = searchParams.get('category') || '';

//         // Build filter object
//         const filter: any = {};

//         if (search) {
//             filter.$or = [
//                 { title: { $regex: search, $options: 'i' } },
//                 { description: { $regex: search, $options: 'i' } }
//             ];
//         }

//         if (status && status !== 'all') {
//             filter.status = status;
//         }

//         if (type) {
//             filter.type = type;
//         }

//         if (category) {
//             filter.category = category;
//         }

//         const Opening = getOpeningModel();
//         const openings = await Opening.find(filter)
//             .sort({ createdAt: -1 })
//             .select('-__v')
//             .lean();

//         return NextResponse.json({
//             success: true,
//             data: openings,
//             total: openings.length
//         });
//     } catch (error) {
//         console.error('Get openings error:', error);
//         return NextResponse.json(
//             {
//                 success: false,
//                 message: 'Failed to fetch openings',
//                 error: 'Internal server error',
//             },
//             { status: 500 }
//         );
//     }
// }

// // POST /api/admin/openings - Create new opening
// export async function POST(request: NextRequest) {
//     // Apply admin auth middleware
//     const authResponse = await adminAuthMiddleware(request);
//     if (authResponse.status !== 200) {
//         return authResponse;
//     }

//     try {
//         await connectToDatabase();

//         const body = await request.json();
//         const {
//             title,
//             description,
//             requirements,
//             responsibilities,
//             qualifications,
//             skills,
//             type,
//             category,
//             location,
//             deadline,
//             status = 'active',
//             maxApplications
//         } = body;

//         // Validation
//         if (!title || !description || !location || !deadline || !maxApplications) {
//             return NextResponse.json(
//                 {
//                     success: false,
//                     message: 'Validation failed',
//                     error: 'Required fields: title, description, location, deadline, maxApplications',
//                 },
//                 { status: 400 }
//             );
//         }

//         const Opening = getOpeningModel();

//         // Get user ID from middleware headers
//         const userId = request.headers.get('x-user-id');

//         // Create new opening
//         const opening = new Opening({
//             title,
//             description,
//             requirements: Array.isArray(requirements) ? requirements : (requirements || '').split(',').map((r: string) => r.trim()).filter(Boolean),
//             responsibilities: Array.isArray(responsibilities) ? responsibilities : (responsibilities || '').split(',').map((r: string) => r.trim()).filter(Boolean),
//             qualifications: Array.isArray(qualifications) ? qualifications : (qualifications || '').split(',').map((q: string) => q.trim()).filter(Boolean),
//             skills: Array.isArray(skills) ? skills : (skills || '').split(',').map((s: string) => s.trim()).filter(Boolean),
//             type: type || 'part-time',
//             category: category || 'technical',
//             location,
//             deadline,
//             status,
//             maxApplications: Number(maxApplications),
//             currentApplications: 0,
//             createdBy: userId
//         });

//         await opening.save();

//         return NextResponse.json({
//             success: true,
//             message: 'Opening created successfully',
//             data: opening
//         }, { status: 201 });

//     } catch (error: unknown) {
//         console.error('Create opening error:', error);

//         if (error instanceof mongoose.Error.ValidationError) {
//             return NextResponse.json(
//                 {
//                     success: false,
//                     message: 'Validation failed',
//                     error: error.message,
//                 },
//                 { status: 400 }
//             );
//         }

//         return NextResponse.json(
//             {
//                 success: false,
//                 message: 'Failed to create opening',
//                 error: error || 'Internal server error',
//             },
//             { status: 500 }
//         );
//     }
// }












import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getOpeningModel } from '@/models/opening.model';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

// Define enums for better type safety
enum OpeningStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
  CLOSED = 'closed'
}

enum OpeningType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  INTERNSHIP = 'internship',
  CONTRACT = 'contract'
}

enum OpeningCategory {
  TECHNICAL = 'technical',
  NON_TECHNICAL = 'non-technical',
  MANAGEMENT = 'management',
  DESIGN = 'design',
  MARKETING = 'marketing'
}

// Define interfaces for better type safety
interface SearchCondition {
  [key: string]: { $regex: string; $options: string };
}

interface FilterCriteria {
  $or?: SearchCondition[];
  status?: OpeningStatus | string;
  type?: OpeningType | string;
  category?: OpeningCategory | string;
}

interface OpeningData {
  title: string;
  description: string;
  requirements?: string[] | string;
  responsibilities?: string[] | string;
  qualifications?: string[] | string;
  skills?: string[] | string;
  type?: OpeningType | string;
  category?: OpeningCategory | string;
  location: string;
  deadline: string;
  status?: OpeningStatus | string;
  maxApplications: number | string;
}

// GET /api/admin/openings - Get all openings
export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const status = searchParams.get('status') || '';
        const type = searchParams.get('type') || '';
        const category = searchParams.get('category') || '';

        // Build filter object with proper typing
        const filter: FilterCriteria = {};

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
    } catch (error: unknown) {
        console.error('Get openings error:', error);
        
        const errorMessage = error instanceof Error ? error.message : 'Internal server error';
        
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch openings',
                error: errorMessage,
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

        const body: OpeningData = await request.json();
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
            status = OpeningStatus.ACTIVE,
            maxApplications
        } = body;

        // Enhanced validation
        const requiredFields = [
            { field: 'title', name: 'Title' },
            { field: 'description', name: 'Description' },
            { field: 'location', name: 'Location' },
            { field: 'deadline', name: 'Deadline' },
            { field: 'maxApplications', name: 'Maximum Applications' }
        ];

        const missingFields = requiredFields
            .filter(({ field }) => !body[field as keyof OpeningData])
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

        // Validate maxApplications
        const maxApplicationsNum = Number(maxApplications);
        if (isNaN(maxApplicationsNum) || maxApplicationsNum <= 0 || !Number.isInteger(maxApplicationsNum)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Validation failed',
                    error: 'Maximum applications must be a positive integer',
                },
                { status: 400 }
            );
        }

        // Validate deadline
        const deadlineDate = new Date(deadline);
        const currentDate = new Date();
        if (isNaN(deadlineDate.getTime())) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Validation failed',
                    error: 'Invalid deadline date format',
                },
                { status: 400 }
            );
        }
        if (deadlineDate <= currentDate) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Validation failed',
                    error: 'Deadline must be a future date',
                },
                { status: 400 }
            );
        }

        const Opening = getOpeningModel();

        // Get user ID from middleware headers
        const userId = request.headers.get('x-user-id');

        // Helper function to process array fields
        const processArrayField = (field: string[] | string | undefined): string[] => {
            if (Array.isArray(field)) return field;
            if (typeof field === 'string') {
                return field.split(',').map((item: string) => item.trim()).filter(Boolean);
            }
            return [];
        };

        // Create new opening
        const opening = new Opening({
            title,
            description,
            requirements: processArrayField(requirements),
            responsibilities: processArrayField(responsibilities),
            qualifications: processArrayField(qualifications),
            skills: processArrayField(skills),
            type: type || OpeningType.PART_TIME,
            category: category || OpeningCategory.TECHNICAL,
            location,
            deadline,
            status,
            maxApplications: maxApplicationsNum,
            currentApplications: 0,
            createdBy: userId
        });

        await opening.save();

        return NextResponse.json({
            success: true,
            message: 'Opening created successfully',
            data: opening
        }, { status: 201 });

    } catch (error: unknown) {
        console.error('Create opening error:', error);

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
                message: 'Failed to create opening',
                error: errorMessage,
            },
            { status: 500 }
        );
    }
}