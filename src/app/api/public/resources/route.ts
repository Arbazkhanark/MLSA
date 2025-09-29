import { connectToDatabase } from '@/lib/db';
import { getResourceModel } from '@/models/resource.model';
import { NextRequest, NextResponse } from 'next/server';

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
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const limit = parseInt(searchParams.get('limit') || '50');

    // Build filter object
    const filter: any = {};
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
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

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const Resource = getResourceModel();
    const resources = await Resource.find(filter)
      .sort(sort)
      .limit(limit)
      .select('-__v -createdBy -updatedAt')
      .lean();

    // Get featured resources separately if not already filtered
    let featuredResources: any[] = [];
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
  } catch (error) {
    console.error('Get public resources error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch resources',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}