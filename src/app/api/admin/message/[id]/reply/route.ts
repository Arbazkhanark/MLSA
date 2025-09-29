import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getMessageModel } from '@/models/message.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// PUT /api/admin/messages/[id]/reply - Reply to message
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
    const { reply } = body;

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

    if (!reply || reply.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: 'Reply message is required',
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

    // Get user info from middleware
    const userEmail = request.headers.get('x-user-email');

    // Update message with reply
    const updateData = {
      reply: reply.trim(),
      repliedBy: userEmail || 'Admin',
      repliedDate: new Date().toISOString(),
      status: 'replied' as const
    };

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');

    return NextResponse.json({
      success: true,
      message: 'Reply sent successfully',
      data: updatedMessage
    });
  } catch (error: any) {
    console.error('Reply to message error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send reply',
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}