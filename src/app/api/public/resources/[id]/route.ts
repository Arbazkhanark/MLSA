import { connectToDatabase } from '@/lib/db';
import { getResourceModel } from '@/models/resource.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// GET /api/resources/[id] - Get single resource for public
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid resource ID',
          error: 'Invalid ID format',
        },
        { status: 400 }
      );
    }

    const Resource = getResourceModel();
    const resource = await Resource.findById(id).select('-__v -createdBy -updatedAt').lean();

    if (!resource) {
      return NextResponse.json(
        {
          success: false,
          message: 'Resource not found',
          error: 'No resource found with this ID',
        },
        { status: 404 }
      );
    }

    // Increment view count
    await Resource.findByIdAndUpdate(id, { $inc: { views: 1 } });

    return NextResponse.json({
      success: true,
      data: resource
    });
  } catch (error) {
    console.error('Get resource error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch resource',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}