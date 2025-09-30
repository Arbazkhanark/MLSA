import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getMessageModel } from '@/models/message.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// PUT /api/admin/messages/[id]/status - Update message status
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
        const { status } = body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid message ID',
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

        const validStatuses = ['unread', 'read', 'replied', 'resolved', 'archived'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Validation failed',
                    error: 'Invalid status value',
                },
                { status: 400 }
            );
        }

        const Message = getMessageModel();

        // Check if message exists
        const existingMessage = await Message.findById(id);
        if (!existingMessage) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Message not found',
                    error: 'No message found with this ID',
                },
                { status: 404 }
            );
        }

        // Update message status
        const updatedMessage = await Message.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        ).select('-__v');

        return NextResponse.json({
            success: true,
            message: 'Message status updated successfully',
            data: updatedMessage
        });
    } catch (error: unknown) {
        console.error('Update message status error:', error);

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
                message: 'Failed to update message status',
                error: error || 'Internal server error',
            },
            { status: 500 }
        );
    }
}