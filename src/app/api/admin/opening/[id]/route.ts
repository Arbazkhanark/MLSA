import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getOpeningModel } from '@/models/opening.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// GET /api/admin/openings/[id] - Get single opening
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid opening ID',
          error: 'Invalid ID format',
        },
        { status: 400 }
      );
    }

    const Opening = getOpeningModel();
    const opening = await Opening.findById(id).select('-__v').lean();

    if (!opening) {
      return NextResponse.json(
        {
          success: false,
          message: 'Opening not found',
          error: 'No opening found with this ID',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: opening
    });
  } catch (error) {
    console.error('Get opening error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch opening',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// PUT /api/admin/openings/[id] - Update opening
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

    const { id } = await params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid opening ID',
          error: 'Invalid ID format',
        },
        { status: 400 }
      );
    }

    const Opening = getOpeningModel();

    // Check if opening exists
    const existingOpening = await Opening.findById(id);
    if (!existingOpening) {
      return NextResponse.json(
        {
          success: false,
          message: 'Opening not found',
          error: 'No opening found with this ID',
        },
        { status: 404 }
      );
    }

    // Handle array conversions
    const arrayFields = ['requirements', 'responsibilities', 'qualifications', 'skills'];
    arrayFields.forEach(field => {
      if (body[field] && typeof body[field] === 'string') {
        body[field] = body[field].split(',').map((item: string) => item.trim()).filter(Boolean);
      }
    });

    // Update opening
    const updatedOpening = await Opening.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    ).select('-__v');

    return NextResponse.json({
      success: true,
      message: 'Opening updated successfully',
      data: updatedOpening
    });
  } catch (error: any) {
    console.error('Update opening error:', error);
    
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
        message: 'Failed to update opening',
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/openings/[id] - Delete opening
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

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid opening ID',
          error: 'Invalid ID format',
        },
        { status: 400 }
      );
    }

    const Opening = getOpeningModel();

    // Check if opening exists
    const existingOpening = await Opening.findById(id);
    if (!existingOpening) {
      return NextResponse.json(
        {
          success: false,
          message: 'Opening not found',
          error: 'No opening found with this ID',
        },
        { status: 404 }
      );
    }

    // Delete opening
    await Opening.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Opening deleted successfully'
    });
  } catch (error) {
    console.error('Delete opening error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete opening',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}