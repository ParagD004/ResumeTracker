


import { NextResponse } from 'next/server';
import { serverStorage } from '@/lib/appwrite';
import { ID } from 'appwrite';
import  JobPosting  from '@/models/JobPosting';
import dbConnect from '@/lib/mongoose';

export async function POST(request: Request) {
  await dbConnect();
  try {
    const formData = await request.formData();
    const files = formData.getAll('resumes') as File[];
    
    // const uploadPromises = files.map(file => 
    //   serverStorage.createFile(
    const jobId = formData.get('jobId') as string;

    if (!jobId) {
      return NextResponse.json(
        { success: false, error: 'Job ID is required' },
        { status: 400 }
      );
    }

    // Upload files to Appwrite and prepare resume metadata
    const uploadPromises = files.map(async (file) => {
      const uploadedFile = await serverStorage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
        ID.unique(),
        file
    //   )
    // );
      );

      return {
        fileId: uploadedFile.$id,
        filename: file.name,
        uploadedAt: new Date()
      };
    });

    // const results = await Promise.all(uploadPromises);
    const resumesData = await Promise.all(uploadPromises);

    // Update MongoDB with the resume metadata
    const updatedJob = await JobPosting.findByIdAndUpdate(
      jobId,
      {
        $push: {
          resumes: { $each: resumesData }
        }
      },
      { new: true }
    );

    if (!updatedJob) {
      return NextResponse.json(
        { success: false, error: 'Job posting not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      // data: results.map(r => r.$id)
      data: {
        fileIds: resumesData.map(r => r.fileId),
        jobId: updatedJob._id,
        numberOfFiles: resumesData.length
      } 
    });
  } catch (error) {
    console.error('Error uploading resumes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload resumes' },
      { status: 500 }
    );
  }
}

