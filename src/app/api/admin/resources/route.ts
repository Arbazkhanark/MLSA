import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getResourceModel } from '@/models/resource.model';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/admin/resources - Get all resources
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const type = searchParams.get('type') || '';
    const featured = searchParams.get('featured') || '';

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

    if (featured === 'true') {
      filter.featured = true;
    }

    const Resource = getResourceModel();
    const resources = await Resource.find(filter)
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    return NextResponse.json({
      success: true,
      data: resources,
      total: resources.length
    });
  } catch (error) {
    console.error('Get resources error:', error);
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

// POST /api/admin/resources - Create new resource
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
      url,
      type,
      category,
      difficulty,
      tags,
      author,
      featured = false
    } = body;

    // Validation
    if (!title || !description || !url || !author) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: 'Required fields: title, description, url, author',
        },
        { status: 400 }
      );
    }

    const Resource = getResourceModel();

    // Get user ID from middleware headers
    const userId = request.headers.get('x-user-id');

    // Create new resource
    const resource = new Resource({
      title,
      description,
      url,
      type: type || 'article',
      category: category || 'General',
      difficulty: difficulty || 'beginner',
      tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
      author,
      dateAdded: new Date().toISOString().split('T')[0],
      featured,
      rating: 0,
      views: 0,
      createdBy: userId
    });

    await resource.save();

    return NextResponse.json({
      success: true,
      message: 'Resource created successfully',
      data: resource
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create resource error:', error);
    
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
        message: 'Failed to create resource',
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}