import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getApplicationModel } from '@/models/application.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getOpeningModel } from '@/models/opening.model';

// GET /api/admin/applications/[id] - Get single application
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
          message: 'Invalid application ID',
          error: 'Invalid ID format',
        },
        { status: 400 }
      );
    }

    getOpeningModel();
    const Application = getApplicationModel();
    const application = await Application.findById(id)
      .populate('openingId', 'title description requirements responsibilities')
      .select('-__v')
      .lean();

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: 'Application not found',
          error: 'No application found with this ID',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: application
    });
  } catch (error: unknown) {
    console.error('Get application error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch application',
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

// PUT /api/admin/applications/[id] - Update application
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
          message: 'Invalid application ID',
          error: 'Invalid ID format',
        },
        { status: 400 }
      );
    }

    const Application = getApplicationModel();

    // Check if application exists
    const existingApplication = await Application.findById(id);
    if (!existingApplication) {
      return NextResponse.json(
        {
          success: false,
          message: 'Application not found',
          error: 'No application found with this ID',
        },
        { status: 404 }
      );
    }

    // Handle skills conversion
    if (body.skills && typeof body.skills === 'string') {
      body.skills = body.skills.split(',').map((s: string) => s.trim()).filter(Boolean);
    }

    // Update application
    getOpeningModel();
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    )
    .populate('openingId', 'title description')
    .select('-__v');

    return NextResponse.json({
      success: true,
      message: 'Application updated successfully',
      data: updatedApplication
    });
  } catch (error: unknown) {
    console.error('Update application error:', error);

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
        message: 'Failed to update application',
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/applications/[id] - Delete application
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
          message: 'Invalid application ID',
          error: 'Invalid ID format',
        },
        { status: 400 }
      );
    }

    const Application = getApplicationModel();

    // Check if application exists
    const existingApplication = await Application.findById(id);
    if (!existingApplication) {
      return NextResponse.json(
        {
          success: false,
          message: 'Application not found',
          error: 'No application found with this ID',
        },
        { status: 404 }
      );
    }

    // Delete application
    await Application.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error: unknown) {
    console.error('Delete application error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete application',
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}