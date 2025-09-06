import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import JobPosting from '@/models/JobPosting';
import { JobPostingData } from '@/types/jobPosting';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const jobData: JobPostingData = await request.json();
    console.log('Received jobData:', jobData);
    const newJobPosting = new JobPosting(jobData);
    await newJobPosting.save();
    return NextResponse.json({ success: true, data: newJobPosting }, { status: 201 });
  } catch (error) {
    console.error('Error creating job posting:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 400 }
    );
  }
}