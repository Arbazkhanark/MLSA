import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getMomentModel } from '@/models/moment.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// GET /api/admin/moments/[id] - Get single moment
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
                    message: 'Invalid moment ID',
                    error: 'Invalid ID format',
                },
                { status: 400 }
            );
        }

        const Moment = getMomentModel();
        const moment = await Moment.findById(id).select('-__v').lean();

        if (!moment) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Moment not found',
                    error: 'No moment found with this ID',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: moment
        });
    } catch (error) {
        console.error('Get moment error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch moment',
                error: 'Internal server error',
            },
            { status: 500 }
        );
    }
}

// PUT /api/admin/moments/[id] - Update moment
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

        // Handle array conversions
        if (body.participants && typeof body.participants === 'string') {
            body.participants = body.participants.split(',').map((p: string) => p.trim()).filter(Boolean);
        }

        if (body.tags && typeof body.tags === 'string') {
            body.tags = body.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
        }

        // Update moment
        const updatedMoment = await Moment.findByIdAndUpdate(
            id,
            { ...body },
            { new: true, runValidators: true }
        ).select('-__v');

        return NextResponse.json({
            success: true,
            message: 'Moment updated successfully',
            data: updatedMoment
        });
    } catch (error: unknown) {
        console.error('Update moment error:', error);
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

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update moment',
                error: error || 'Internal server error',
            },
            { status: 500 }
        );
    }
}

// DELETE /api/admin/moments/[id] - Delete moment
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

        // Delete moment
        await Moment.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: 'Moment deleted successfully'
        });
    } catch (error) {
        console.error('Delete moment error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to delete moment',
                error: 'Internal server error',
            },
            { status: 500 }
        );
    }
}