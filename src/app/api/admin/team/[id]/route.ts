import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/db';
import { getTeamMemberModel } from '@/models/team-member.model';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';

// GET /api/team/[id] - Get single team member
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
                    message: 'Invalid team member ID',
                    error: 'Invalid ID format',
                },
                { status: 400 }
            );
        }

        const TeamMember = getTeamMemberModel();
        const teamMember = await TeamMember.findById(id).select('-__v').lean();

        if (!teamMember) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Team member not found',
                    error: 'No team member found with this ID',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: teamMember
        });
    } catch (error) {
        console.error('Get team member error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch team member',
                error: 'Internal server error',
            },
            { status: 500 }
        );
    }
}

// PUT /api/team/[id] - Update team member
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
                    message: 'Invalid team member ID',
                    error: 'Invalid ID format',
                },
                { status: 400 }
            );
        }

        // Check if team member exists
        const TeamMember = getTeamMemberModel();
        const existingMember = await TeamMember.findById(id);
        if (!existingMember) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Team member not found',
                    error: 'No team member found with this ID',
                },
                { status: 404 }
            );
        }

        // Handle skills array conversion
        if (body.skills && typeof body.skills === 'string') {
            body.skills = body.skills.split(',').map((s: string) => s.trim());
        }

        // Update team member
        const updatedMember = await TeamMember.findByIdAndUpdate(
            id,
            { ...body },
            { new: true, runValidators: true }
        ).select('-__v');

        return NextResponse.json({
            success: true,
            message: 'Team member updated successfully',
            data: updatedMember
        });
    } catch (error) {
        console.error('Update team member error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update team member',
                error: 'Internal server error',
            },
            { status: 500 }
        );
    }
}

// DELETE /api/team/[id] - Delete team member
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
                    message: 'Invalid team member ID',
                    error: 'Invalid ID format',
                },
                { status: 400 }
            );
        }

        // Check if team member exists
        const TeamMember = getTeamMemberModel();
        const existingMember = await TeamMember.findById(id);
        if (!existingMember) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Team member not found',
                    error: 'No team member found with this ID',
                },
                { status: 404 }
            );
        }

        // Delete team member
        await TeamMember.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: 'Team member deleted successfully'
        });
    } catch (error) {
        console.error('Delete team member error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to delete team member',
                error: 'Internal server error',
            },
            { status: 500 }
        );
    }
}