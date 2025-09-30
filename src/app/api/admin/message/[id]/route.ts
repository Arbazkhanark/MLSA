import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getMessageModel } from '@/models/message.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// GET /api/admin/messages/[id] - Get single message
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
                    message: 'Invalid message ID',
                    error: 'Invalid ID format',
                },
                { status: 400 }
            );
        }

        const Message = getMessageModel();
        const message = await Message.findById(id).select('-__v').lean();

        if (!message) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Message not found',
                    error: 'No message found with this ID',
                },
                { status: 404 }
            );
        }

        // Mark as read if it's unread
        if (message.status === 'unread') {
            await Message.findByIdAndUpdate(id, { status: 'read' });
        }

        return NextResponse.json({
            success: true,
            data: message
        });
    } catch (error) {
        console.error('Get message error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch message',
                error: 'Internal server error',
            },
            { status: 500 }
        );
    }
}

// PUT /api/admin/messages/[id] - Update message
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
                    message: 'Invalid message ID',
                    error: 'Invalid ID format',
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

        // Update message
        const updatedMessage = await Message.findByIdAndUpdate(
            id,
            { ...body },
            { new: true, runValidators: true }
        ).select('-__v');

        return NextResponse.json({
            success: true,
            message: 'Message updated successfully',
            data: updatedMessage
        });
    } catch (error: unknown) {
        console.error('Update message error:', error);

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
                message: 'Failed to update message',
                error: error || 'Internal server error',
            },
            { status: 500 }
        );
    }
}

// DELETE /api/admin/messages/[id] - Delete message
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
                    message: 'Invalid message ID',
                    error: 'Invalid ID format',
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

        // Delete message
        await Message.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: 'Message deleted successfully'
        });
    } catch (error) {
        console.error('Delete message error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to delete message',
                error: 'Internal server error',
            },
            { status: 500 }
        );
    }
}