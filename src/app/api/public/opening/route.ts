import { connectToDatabase } from '@/lib/db';
import { getOpeningModel } from '@/models/opening.model';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/openings - Get active openings for public
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || '';
    const category = searchParams.get('category') || '';

    // Build filter object - only show active openings
    const filter: any = { status: 'active' };
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (type) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    const Opening = getOpeningModel();
    const openings = await Opening.find(filter)
      .sort({ createdAt: -1 })
      .select('-__v -createdBy -updatedAt')
      .lean();

    return NextResponse.json({
      success: true,
      data: openings,
      total: openings.length
    });
  } catch (error) {
    console.error('Get public openings error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch openings',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}