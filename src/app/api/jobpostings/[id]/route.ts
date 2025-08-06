import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/mongoose';
import JobPosting from '@/models/JobPosting';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const job = await JobPosting.findById(params.id).lean();
    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job posting not found' },
        { status: 404 }
      );
    }
    
    // Convert MongoDB ObjectId to string
    (job as { _id: any })._id = (job as { _id: any })._id.toString();

    
    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    console.error('Error fetching job posting:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch job posting' },
      { status: 400 }
    );
  }
}