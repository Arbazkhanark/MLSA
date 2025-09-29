import { connectToDatabase } from '@/lib/db';
import { getResourceModel } from '@/models/resource.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// PUT /api/resources/[id]/rating - Rate a resource
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const { id } = await params;
    const body = await request.json();
    const { rating } = body;

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

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: 'Rating must be between 1 and 5',
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

    // Update rating (simple average calculation)
    const newRating = (existingResource.rating + rating) / 2;

    const updatedResource = await Resource.findByIdAndUpdate(
      id,
      { rating: parseFloat(newRating.toFixed(1)) },
      { new: true, runValidators: true }
    ).select('-__v -createdBy -updatedAt');

    return NextResponse.json({
      success: true,
      message: 'Rating submitted successfully',
      data: updatedResource
    });
  } catch (error: any) {
    console.error('Rate resource error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit rating',
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}