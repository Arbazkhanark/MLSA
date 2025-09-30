// import { connectToDatabase } from '@/lib/db';
// import { getOpeningModel } from '@/models/opening.model';
// import { NextRequest, NextResponse } from 'next/server';

// // GET /api/openings - Get active openings for public
// export async function GET(request: NextRequest) {
//   try {
//     await connectToDatabase();

//     const { searchParams } = new URL(request.url);
//     const search = searchParams.get('search') || '';
//     const type = searchParams.get('type') || '';
//     const category = searchParams.get('category') || '';

//     // Build filter object - only show active openings
//     const filter: any = { status: 'active' };

//     if (search) {
//       filter.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } }
//       ];
//     }

//     if (type) {
//       filter.type = type;
//     }

//     if (category) {
//       filter.category = category;
//     }

//     const Opening = getOpeningModel();
//     const openings = await Opening.find(filter)
//       .sort({ createdAt: -1 })
//       .select('-__v -createdBy -updatedAt')
//       .lean();

//     return NextResponse.json({
//       success: true,
//       data: openings,
//       total: openings.length
//     });
//   } catch (error) {
//     console.error('Get public openings error:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch openings',
//         error: 'Internal server error',
//       },
//       { status: 500 }
//     );
//   }
// }











import { connectToDatabase } from '@/lib/db';
import { getOpeningModel } from '@/models/opening.model';
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

// Define interface for filter criteria
interface SearchCondition {
    [key: string]: { $regex: string; $options: string };
}

interface FilterCriteria {
    status: OpeningStatus;
    $or?: SearchCondition[];
    type?: OpeningType | string;
    category?: OpeningCategory | string;
}

// GET /api/openings - Get active openings for public
export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const type = searchParams.get('type') || '';
        const category = searchParams.get('category') || '';

        // Build filter object with proper typing - only show active openings
        const filter: FilterCriteria = { status: OpeningStatus.ACTIVE };

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
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
            .select('-__v -createdBy -updatedAt')
            .lean();

        return NextResponse.json({
            success: true,
            data: openings,
            total: openings.length
        });
    } catch (error: unknown) {
        console.error('Get public openings error:', error);

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