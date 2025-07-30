// app/api/jobs/[jobId]/route.ts
import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    
    // Convert string ID to MongoDB ObjectId
    const objectId = new ObjectId(params.jobId);
    
    const job = await db.collection('JobPostings').findOne({ _id: objectId });

    client.close();

    if (!job) {
      return NextResponse.json(
        { message: 'Job not found' },
        { status: 404 }
      );
    }

    // Convert ObjectId to string for the response
    const responseData = {
      ...job,
      _id: job._id.toString(),
      requiredSkills: job.skills ? job.skills.split(',').map((s: string) => s.trim()) : []
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}