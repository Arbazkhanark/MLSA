import { connectToDatabase } from '@/lib/db';
import { getApplicationModel } from '@/models/application.model';
import { getOpeningModel } from '@/models/opening.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// POST /api/applications - Submit new application (Public)
// export async function POST(request: NextRequest) {
//   try {
//     await connectToDatabase();

//     const body = await request.json();
//     const {
//       openingId,
//       name,
//       email,
//       phone,
//       university,
//       major,
//       year,
//       gpa,
//       experience,
//       skills,
//       motivation,
//       availability,
//       portfolio,
//       resume
//     } = body;

//     // Validation
//     const requiredFields = [
//       'openingId', 'name', 'email', 'phone', 'university', 'major', 'year', 
//       'gpa', 'experience', 'motivation', 'availability', 'resume'
//     ];
    
//     const missingFields = requiredFields.filter(field => !body[field]);
//     if (missingFields.length > 0) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Validation failed',
//           error: `Missing required fields: ${missingFields.join(', ')}`,
//         },
//         { status: 400 }
//       );
//     }

//     // Validate openingId
//     if (!mongoose.Types.ObjectId.isValid(openingId)) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Invalid opening ID',
//           error: 'Invalid opening ID format',
//         },
//         { status: 400 }
//       );
//     }

//     const Opening = getOpeningModel();
//     const Application = getApplicationModel();

//     // Check if opening exists and is active
//     const opening = await Opening.findById(openingId);
//     if (!opening) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Opening not found',
//           error: 'No active opening found with this ID',
//         },
//         { status: 404 }
//       );
//     }

//     if (opening.status !== 'active') {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Opening not available',
//           error: 'This opening is no longer accepting applications',
//         },
//         { status: 400 }
//       );
//     }

//     // Check if deadline has passed
//     const currentDate = new Date().toISOString().split('T')[0];
//     if (opening.deadline < currentDate) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Application deadline passed',
//           error: 'The application deadline for this opening has passed',
//         },
//         { status: 400 }
//       );
//     }

//     // Check if max applications reached
//     if (opening.currentApplications >= opening.maxApplications) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Opening full',
//           error: 'This opening has reached maximum applications',
//         },
//         { status: 400 }
//       );
//     }

//     // Check for duplicate application (same email for same opening)
//     const existingApplication = await Application.findOne({ 
//       openingId, 
//       email: email.toLowerCase() 
//     });
    
//     if (existingApplication) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Duplicate application',
//           error: 'You have already applied for this opening',
//         },
//         { status: 409 }
//       );
//     }

//     // Create new application
//     const application = new Application({
//       openingId,
//       name,
//       email: email.toLowerCase(),
//       phone,
//       university,
//       major,
//       year,
//       gpa,
//       position: opening.title,
//       experience,
//       skills: Array.isArray(skills) ? skills : (skills || '').split(',').map((s: string) => s.trim()).filter(Boolean),
//       motivation,
//       availability,
//       portfolio: portfolio || '',
//       resume,
//       appliedDate: currentDate,
//       status: 'pending'
//     });

//     await application.save();

//     // Update opening's application count
//     await Opening.findByIdAndUpdate(openingId, {
//       $inc: { currentApplications: 1 }
//     });

//     return NextResponse.json({
//       success: true,
//       message: 'Application submitted successfully',
//       data: {
//         id: application._id,
//         position: application.position,
//         appliedDate: application.appliedDate
//       }
//     }, { status: 201 });

//   } catch (error: any) {
//     console.error('Submit application error:', error);
    
//     if (error.name === 'ValidationError') {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Validation failed',
//           error: error.message,
//         },
//         { status: 400 }
//       );
//     }
    
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to submit application',
//         error: error.message || 'Internal server error',
//       },
//       { status: 500 }
//     );
//   }
// }




// GET /api/admin/applications - Get all applications
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const position = searchParams.get('position') || '';

    // Build filter object
    const filter: any = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } },
        { university: { $regex: search, $options: 'i' } }
      ];
    }

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (position && position !== 'all') {
      filter.position = position;
    }

    const Application = getApplicationModel();
    const applications = await Application.find(filter)
      .populate('openingId', 'title description')
      .sort({ appliedDate: -1 })
      .select('-__v')
      .lean();

    return NextResponse.json({
      success: true,
      data: applications,
      total: applications.length
    });
  } catch (error) {
    console.error('Get applications error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch applications',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
