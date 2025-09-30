// import { connectToDatabase } from '@/lib/db';
// import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
// import { getApplicationModel } from '@/models/application.model';
// import { NextRequest, NextResponse } from 'next/server';
// import mongoose from 'mongoose';

// // PUT /api/admin/applications/[id]/status - Update application status
// export async function PUT(
//     request: NextRequest,
//     { params }: { params: { id: string } }
// ) {
//     // Apply admin auth middleware
//     const authResponse = await adminAuthMiddleware(request);
//     if (authResponse.status !== 200) {
//         return authResponse;
//     }

//     try {
//         await connectToDatabase();

//         const { id } = await params;
//         const body = await request.json();
//         const { status, notes, interviewDate, interviewScore } = body;

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return NextResponse.json(
//                 {
//                     success: false,
//                     message: 'Invalid application ID',
//                     error: 'Invalid ID format',
//                 },
//                 { status: 400 }
//             );
//         }

//         if (!status) {
//             return NextResponse.json(
//                 {
//                     success: false,
//                     message: 'Validation failed',
//                     error: 'Status is required',
//                 },
//                 { status: 400 }
//             );
//         }

//         const Application = getApplicationModel();

//         // Check if application exists
//         const existingApplication = await Application.findById(id);
//         if (!existingApplication) {
//             return NextResponse.json(
//                 {
//                     success: false,
//                     message: 'Application not found',
//                     error: 'No application found with this ID',
//                 },
//                 { status: 404 }
//             );
//         }

//         // Prepare update data
//         const updateData: any = { status };

//         if (notes !== undefined) updateData.notes = notes;
//         if (interviewDate) updateData.interviewDate = interviewDate;
//         if (interviewScore !== undefined) updateData.interviewScore = interviewScore;

//         // Update application status
//         const updatedApplication = await Application.findByIdAndUpdate(
//             id,
//             updateData,
//             { new: true, runValidators: true }
//         )
//             .populate('openingId', 'title description')
//             .select('-__v');

//         return NextResponse.json({
//             success: true,
//             message: 'Application status updated successfully',
//             data: updatedApplication
//         });
//     } catch (error: unknown) {
//         console.error('Update application error:', error);

//         if (error instanceof mongoose.Error.ValidationError) {
//             return NextResponse.json(
//                 {
//                     success: false,
//                     message: 'Validation failed',
//                     error: error.message,
//                 },
//                 { status: 400 }
//             );
//         }

//         return NextResponse.json(
//             {
//                 success: false,
//                 message: 'Failed to update application status',
//                 error: error || 'Internal server error',
//             },
//             { status: 500 }
//         );
//     }
// }
















import { connectToDatabase } from '@/lib/db';
import { adminAuthMiddleware } from '@/middleware/authAdminMiddleware';
import { getApplicationModel } from '@/models/application.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Define interface for the request body
interface StatusUpdateBody {
    status: string;
    notes?: string;
    interviewDate?: string;
    interviewScore?: number;
}

// Define interface for update data
interface UpdateData {
    status: string;
    notes?: string;
    interviewDate?: Date;
    interviewScore?: number;
}

// PUT /api/admin/applications/[id]/status - Update application status
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
        const body: StatusUpdateBody = await request.json();
        const { status, notes, interviewDate, interviewScore } = body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid application ID',
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

        const Application = getApplicationModel();

        // Check if application exists
        const existingApplication = await Application.findById(id);
        if (!existingApplication) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Application not found',
                    error: 'No application found with this ID',
                },
                { status: 404 }
            );
        }

        // Prepare update data with proper typing
        const updateData: UpdateData = { status };

        if (notes !== undefined) updateData.notes = notes;
        if (interviewDate) {
            updateData.interviewDate = new Date(interviewDate);
            // Validate the date
            if (isNaN(updateData.interviewDate.getTime())) {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'Invalid interview date format',
                        error: 'Please provide a valid date',
                    },
                    { status: 400 }
                );
            }
        }
        if (interviewScore !== undefined) {
            if (interviewScore < 0 || interviewScore > 100) {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'Invalid interview score',
                        error: 'Interview score must be between 0 and 100',
                    },
                    { status: 400 }
                );
            }
            updateData.interviewScore = interviewScore;
        }

        // Update application status
        const updatedApplication = await Application.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        )
            .populate('openingId', 'title description')
            .select('-__v');

        return NextResponse.json({
            success: true,
            message: 'Application status updated successfully',
            data: updatedApplication
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

        // Type guard for error with message
        const errorMessage = error instanceof Error ? error.message : 'Internal server error';

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update application status',
                error: errorMessage,
            },
            { status: 500 }
        );
    }
}