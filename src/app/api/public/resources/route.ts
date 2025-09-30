// import { connectToDatabase } from '@/lib/db';
// import { getResourceModel } from '@/models/resource.model';
// import { NextRequest, NextResponse } from 'next/server';

// // GET /api/resources - Get resources for public
// export async function GET(request: NextRequest) {
//   try {
//     await connectToDatabase();

//     const { searchParams } = new URL(request.url);
//     const search = searchParams.get('search') || '';
//     const category = searchParams.get('category') || '';
//     const type = searchParams.get('type') || '';
//     const difficulty = searchParams.get('difficulty') || '';
//     const featured = searchParams.get('featured') || '';
//     const sortBy = searchParams.get('sortBy') || 'createdAt';
//     const sortOrder = searchParams.get('sortOrder') || 'desc';
//     const limit = parseInt(searchParams.get('limit') || '50');

//     // Build filter object
//     const filter: any = {};

//     if (search) {
//       filter.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } },
//         { tags: { $in: [new RegExp(search, 'i')] } },
//         { author: { $regex: search, $options: 'i' } }
//       ];
//     }

//     if (category && category !== 'all') {
//       filter.category = category;
//     }

//     if (type && type !== 'all') {
//       filter.type = type;
//     }

//     if (difficulty && difficulty !== 'all') {
//       filter.difficulty = difficulty;
//     }

//     if (featured === 'true') {
//       filter.featured = true;
//     }

//     // Build sort object
//     const sort: any = {};
//     sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

//     const Resource = getResourceModel();
//     const resources = await Resource.find(filter)
//       .sort(sort)
//       .limit(limit)
//       .select('-__v -createdBy -updatedAt')
//       .lean();

//     // Get featured resources separately if not already filtered
//     let featuredResources: any[] = [];
//     if (featured !== 'true') {
//       featuredResources = await Resource.find({ featured: true })
//         .sort({ createdAt: -1 })
//         .limit(5)
//         .select('-__v -createdBy -updatedAt')
//         .lean();
//     }

//     return NextResponse.json({
//       success: true,
//       data: resources,
//       featured: featuredResources,
//       total: resources.length
//     });
//   } catch (error) {
//     console.error('Get public resources error:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch resources',
//         error: 'Internal server error',
//       },
//       { status: 500 }
//     );
//   }
// }















import { connectToDatabase } from '@/lib/db';
import { getResourceModel } from '@/models/resource.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Define enums for better type safety
enum ResourceType {
    ARTICLE = 'article',
    VIDEO = 'video',
    DOCUMENTATION = 'documentation',
    TUTORIAL = 'tutorial',
    COURSE = 'course',
    TOOL = 'tool'
}

enum ResourceCategory {
    GENERAL = 'General',
    WEB_DEV = 'Web Development',
    MOBILE_DEV = 'Mobile Development',
    AI_ML = 'AI/ML',
    DATA_SCIENCE = 'Data Science',
    CYBERSECURITY = 'Cybersecurity',
    DESIGN = 'Design',
    PRODUCTIVITY = 'Productivity'
}

enum DifficultyLevel {
    BEGINNER = 'beginner',
    INTERMEDIATE = 'intermediate',
    ADVANCED = 'advanced'
}

enum SortField {
    CREATED_AT = 'createdAt',
    TITLE = 'title',
    RATING = 'rating',
    VIEWS = 'views'
}

// Define interfaces for better type safety
interface SearchCondition {
    [key: string]: { $regex: string; $options: string } | { $in: RegExp[] };
}

interface FilterCriteria {
    $or?: SearchCondition[];
    category?: ResourceCategory | string;
    type?: ResourceType | string;
    difficulty?: DifficultyLevel | string;
    featured?: boolean;
}

interface SortCriteria {
    [key: string]: 1 | -1;
}

// GET /api/resources - Get resources for public
export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const category = searchParams.get('category') || '';
        const type = searchParams.get('type') || '';
        const difficulty = searchParams.get('difficulty') || '';
        const featured = searchParams.get('featured') || '';
        const sortBy = searchParams.get('sortBy') || SortField.CREATED_AT;
        const sortOrder = searchParams.get('sortOrder') || 'desc';
        const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100); // Limit to 100 max

        // Build filter object with proper typing
        const filter: FilterCriteria = {};

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $in: [searchRegex] } },
                { author: { $regex: search, $options: 'i' } }
            ];
        }

        if (category && category !== 'all') {
            filter.category = category;
        }

        if (type && type !== 'all') {
            filter.type = type;
        }

        if (difficulty && difficulty !== 'all') {
            filter.difficulty = difficulty;
        }

        if (featured === 'true') {
            filter.featured = true;
        }

        // Build sort object with proper typing
        const sort: SortCriteria = {};
        const validSortFields = [
            SortField.CREATED_AT,
            SortField.TITLE,
            SortField.RATING,
            SortField.VIEWS
        ];
        const actualSortBy = validSortFields.includes(sortBy as SortField) ? sortBy : SortField.CREATED_AT;
        sort[actualSortBy] = sortOrder === 'desc' ? -1 : 1;

        const Resource = getResourceModel();
        const resources = await Resource.find(filter)
            .sort(sort)
            .limit(limit)
            .select('-__v -createdBy -updatedAt')
            .lean();

        // Get featured resources separately if not already filtered
        let featuredResources: mongoose.Document[] = [];
        if (featured !== 'true') {
            featuredResources = await Resource.find({ featured: true })
                .sort({ createdAt: -1 })
                .limit(5)
                .select('-__v -createdBy -updatedAt')
                .lean();
        }

        return NextResponse.json({
            success: true,
            data: resources,
            featured: featuredResources,
            total: resources.length
        });
    } catch (error: unknown) {
        console.error('Get public resources error:', error);

        const errorMessage = error instanceof Error ? error.message : 'Internal server error';

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch resources',
                error: errorMessage,
            },
            { status: 500 }
        );
    }
}