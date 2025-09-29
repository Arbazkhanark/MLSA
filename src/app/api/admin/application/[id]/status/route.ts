import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getApplicationModel } from '@/models/application.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// PUT /api/admin/applications/[id]/status - Update application status
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
    const { status, notes, interviewDate, interviewScore } = body;

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

    if (!status) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: 'Status is required',
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

    // Prepare update data
    const updateData: any = { status };
    
    if (notes !== undefined) updateData.notes = notes;
    if (interviewDate) updateData.interviewDate = interviewDate;
    if (interviewScore !== undefined) updateData.interviewScore = interviewScore;

    // Update application status
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
    .populate('openingId', 'title description')
    .select('-__v');

    return NextResponse.json({
      success: true,
      message: 'Application status updated successfully',
      data: updatedApplication
    });
  } catch (error: any) {
    console.error('Update application status error:', error);
    
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
        message: 'Failed to update application status',
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}