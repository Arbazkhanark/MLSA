import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getEventModel } from '@/models/event.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// GET /api/admin/events/[id] - Get single event
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
                    message: 'Invalid event ID',
                    error: 'Invalid ID format',
                },
                { status: 400 }
            );
        }

        const Event = getEventModel();
        const event = await Event.findById(id).select('-__v').lean();

        if (!event) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Event not found',
                    error: 'No event found with this ID',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: event
        });
    } catch (error) {
        console.error('Get event error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch event',
                error: 'Internal server error',
            },
            { status: 500 }
        );
    }
}

// PUT /api/admin/events/[id] - Update event
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
                    message: 'Invalid event ID',
                    error: 'Invalid ID format',
                },
                { status: 400 }
            );
        }

        const Event = getEventModel();

        // Check if event exists
        const existingEvent = await Event.findById(id);
        if (!existingEvent) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Event not found',
                    error: 'No event found with this ID',
                },
                { status: 404 }
            );
        }

        // Handle tags conversion
        if (body.tags && typeof body.tags === 'string') {
            body.tags = body.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
        }

        // Handle number conversion
        if (body.maxAttendees) {
            body.maxAttendees = Number(body.maxAttendees);
        }

        // Update event
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { ...body },
            { new: true, runValidators: true }
        ).select('-__v');

        return NextResponse.json({
            success: true,
            message: 'Event updated successfully',
            data: updatedEvent
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
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update event',
                error: error || 'Internal server error',
            },
            { status: 500 }
        );
    }
}

// DELETE /api/admin/events/[id] - Delete event
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
                    message: 'Invalid event ID',
                    error: 'Invalid ID format',
                },
                { status: 400 }
            );
        }

        const Event = getEventModel();

        // Check if event exists
        const existingEvent = await Event.findById(id);
        if (!existingEvent) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Event not found',
                    error: 'No event found with this ID',
                },
                { status: 404 }
            );
        }

        // Delete event
        await Event.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        console.error('Delete event error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to delete event',
                error: 'Internal server error',
            },
            { status: 500 }
        );
    }
}