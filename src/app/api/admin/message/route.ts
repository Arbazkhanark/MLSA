import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getMessageModel } from '@/models/message.model';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';



// Define interfaces for better type safety
interface FilterCriteria {
  $or?: Array<{
    [key: string]: { $regex: string; $options: string };
  }>;
  status?: string;
  category?: string;
  priority?: string;
}



// POST /api/contact - Submit contact message (Public)
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const {
      name,
      email,
      phone,
      subject,
      message,
      category = 'general',
      priority = 'medium'
    } = body;

    // Validation
    const requiredFields = ['name', 'email', 'subject', 'message'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: `Missing required fields: ${missingFields.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: 'Invalid email format',
        },
        { status: 400 }
      );
    }

    const Message = getMessageModel();

    // Create new message
    const newMessage = new Message({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim(),
      subject: subject.trim(),
      message: message.trim(),
      category,
      priority,
      receivedDate: new Date().toISOString(),
      status: 'unread'
    });

    await newMessage.save();

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: {
        id: newMessage._id,
        subject: newMessage.subject,
        receivedDate: newMessage.receivedDate
      }
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Submit contact message error:', error);
    
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
        message: 'Failed to send message',
        error: error || 'Internal server error',
      },
      { status: 500 }
    );
  }
}






// GET /api/admin/messages - Get all messages
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const category = searchParams.get('category') || '';
    const priority = searchParams.get('priority') || '';

    // Build filter object
    const filter: FilterCriteria = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (priority && priority !== 'all') {
      filter.priority = priority;
    }

    const Message = getMessageModel();
    const messages = await Message.find(filter)
      .sort({ receivedDate: -1, createdAt: -1 })
      .select('-__v')
      .lean();

    // Get counts for dashboard
    const totalCount = await Message.countDocuments();
    const unreadCount = await Message.countDocuments({ status: 'unread' });
    const repliedCount = await Message.countDocuments({ status: 'replied' });

    return NextResponse.json({
      success: true,
      data: messages,
      counts: {
        total: totalCount,
        unread: unreadCount,
        replied: repliedCount
      }
    });
  } catch (error) {
    console.error('Get messages error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch messages',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/messages - Delete multiple messages
export async function DELETE(request: NextRequest) {
  // Apply admin auth middleware
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse.status !== 200) {
    return authResponse;
  }

  try {
    await connectToDatabase();

    const body = await request.json();
    const { messageIds } = body;

    if (!Array.isArray(messageIds) || messageIds.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: 'Message IDs array is required',
        },
        { status: 400 }
      );
    }

    const Message = getMessageModel();

    // Delete messages
    const result = await Message.deleteMany({ _id: { $in: messageIds } });

    return NextResponse.json({
      success: true,
      message: `${result.deletedCount} messages deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error: unknown) {
    console.error('Delete messages error:', error);
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
        message: 'Failed to delete messages',
        error: error || 'Internal server error',
      },
      { status: 500 }
    );
  }
}