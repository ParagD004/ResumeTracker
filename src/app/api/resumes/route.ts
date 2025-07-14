// app/api/resumes/route.ts
import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    const { jobId, resumeFileId, filename } = await request.json();
    
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    
    // Update the job posting with resume reference
    const result = await db.collection('jobPostings').updateOne(
      { _id: new ObjectId(jobId) },
      { 
        $push: { 
          resumes: {
            fileId: resumeFileId,
            filename,
            uploadedAt: new Date()
          }
        } 
      }
    );

    client.close();

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: 'Job not found or not updated' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Resume association saved' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error storing resume reference:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}