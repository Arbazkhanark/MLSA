import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getResourceModel } from '@/models/resource.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// GET /api/admin/resources/[id] - Get single resource
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const { id } = params;

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
    const resource = await Resource.findById(id).select('-__v').lean();

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

// PUT /api/admin/resources/[id] - Update resource
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Apply admin auth middleware
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse.status !== 200) {
    return authResponse;
  }

  try {
    await connectToDatabase();

    const { id } = params;
    const body = await request.json();

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

    // Check if resource exists
    const existingResource = await Resource.findById(id);
    if (!existingResource) {
      return NextResponse.json(
        {
          success: false,
          message: 'Resource not found',
          error: 'No resource found with this ID',
        },
        { status: 404 }
      );
    }

    // Handle tags conversion
    if (body.tags && typeof body.tags === 'string') {
      body.tags = body.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
    }

    // Update resource
    const updatedResource = await Resource.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    ).select('-__v');

    return NextResponse.json({
      success: true,
      message: 'Resource updated successfully',
      data: updatedResource
    });
  } catch (error: any) {
    console.error('Update resource error:', error);
    
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
        message: 'Failed to update resource',
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/resources/[id] - Delete resource
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Apply admin auth middleware
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse.status !== 200) {
    return authResponse;
  }

  try {
    await connectToDatabase();

    const { id } = params;

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

    // Check if resource exists
    const existingResource = await Resource.findById(id);
    if (!existingResource) {
      return NextResponse.json(
        {
          success: false,
          message: 'Resource not found',
          error: 'No resource found with this ID',
        },
        { status: 404 }
      );
    }

    // Delete resource
    await Resource.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Resource deleted successfully'
    });
  } catch (error) {
    console.error('Delete resource error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete resource',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}