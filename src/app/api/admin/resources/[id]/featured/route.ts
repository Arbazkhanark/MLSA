import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getResourceModel } from '@/models/resource.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// PUT /api/admin/resources/[id]/featured - Toggle featured status
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
        const { featured } = body;

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

        if (typeof featured !== 'boolean') {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Validation failed',
                    error: 'Featured must be a boolean value',
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

        // Update featured status
        const updatedResource = await Resource.findByIdAndUpdate(
            id,
            { featured },
            { new: true, runValidators: true }
        ).select('-__v');

        return NextResponse.json({
            success: true,
            message: `Resource ${featured ? 'featured' : 'unfeatured'} successfully`,
            data: updatedResource
        });
    } catch (error: unknown) {
        console.error('Toggle featured error:', error);
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
                message: 'Failed to update featured status',
                error: error || 'Internal server error',
            },
            { status: 500 }
        );
    }
}