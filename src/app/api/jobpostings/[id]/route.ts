import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import JobPosting from '@/models/JobPosting';

export async function GET(
  request: Request,
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
    job._id = job._id.toString();
    
    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    console.error('Error fetching job posting:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch job posting' },
      { status: 400 }
    );
  }
}