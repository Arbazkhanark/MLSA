import { connectToDatabase } from '@/lib/db';
import { getMomentModel } from '@/models/moment.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// PUT /api/moments/[id]/like - Like a moment
export async function PUT(
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
          message: 'Invalid moment ID',
          error: 'Invalid ID format',
        },
        { status: 400 }
      );
    }

    const Moment = getMomentModel();

    // Check if moment exists
    const existingMoment = await Moment.findById(id);
    if (!existingMoment) {
      return NextResponse.json(
        {
          success: false,
          message: 'Moment not found',
          error: 'No moment found with this ID',
        },
        { status: 404 }
      );
    }

    // Increment likes
    const updatedMoment = await Moment.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true, runValidators: true }
    ).select('-__v -createdBy -updatedAt');

    return NextResponse.json({
      success: true,
      message: 'Moment liked successfully',
      data: updatedMoment
    });
  } catch (error: unknown) {
    console.error('Like moment error:', error);

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
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to like moment',
        error: error || 'Internal server error',
      },
      { status: 500 }
    );
  }
}