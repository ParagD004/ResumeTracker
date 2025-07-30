import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import JobPosting from '@/models/JobPosting';
import { JobPostingData } from '@/types/jobPosting';

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const jobData: JobPostingData = await request.json();
    
    const newJobPosting = new JobPosting(jobData);
    await newJobPosting.save();
    
    return NextResponse.json({ success: true, data: newJobPosting }, { status: 201 });
  } catch (error) {
    console.error('Error creating job posting:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create job posting' },
      { status: 400 }
    );
  }
}