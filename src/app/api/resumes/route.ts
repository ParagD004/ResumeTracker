


import { NextResponse } from 'next/server';
import { serverStorage } from '@/lib/appwrite';
import { ID } from 'appwrite';
import  JobPosting  from '@/models/JobPosting';
import dbConnect from '@/lib/mongoose';

export async function POST(request: Request) {
  console.log('Resumes API: Starting request processing');
  
  try {
    await dbConnect();
    console.log('Resumes API: Database connected');
    
    const formData = await request.formData();
    const files = formData.getAll('resumes') as File[];
    const jobId = formData.get('jobId') as string;

    console.log('Resumes API: Received data:', {
      fileCount: files.length,
      jobId: jobId,
      fileNames: files.map(f => f.name)
    });

    if (!jobId) {
      console.log('Resumes API: Missing jobId');
      return NextResponse.json(
        { success: false, error: 'Job ID is required' },
        { status: 400 }
      );
    }

    if (!files || files.length === 0) {
      console.log('Resumes API: No files provided');
      return NextResponse.json(
        { success: false, error: 'No files provided' },
        { status: 400 }
      );
    }

    // Upload files to Appwrite and prepare resume metadata
    console.log('Resumes API: Starting file upload to Appwrite');
    const uploadPromises = files.map(async (file, index) => {
      try {
        console.log(`Resumes API: Uploading file ${index + 1}: ${file.name}`);
        const uploadedFile = await serverStorage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
          ID.unique(),
          file
        );
        console.log(`Resumes API: File ${file.name} uploaded with ID: ${uploadedFile.$id}`);
        
        return {
          fileId: uploadedFile.$id,
          filename: file.name,
          uploadedAt: new Date()
        };
      } catch (error) {
        console.error(`Resumes API: Error uploading file ${file.name}:`, error);
        throw error;
      }
    });

    const resumesData = await Promise.all(uploadPromises);
    console.log('Resumes API: All files uploaded successfully');

    // Update MongoDB with the resume metadata
    console.log('Resumes API: Updating job posting in MongoDB');
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
      console.log('Resumes API: Job posting not found');
      return NextResponse.json(
        { success: false, error: 'Job posting not found' },
        { status: 404 }
      );
    }
    
    console.log('Resumes API: Job posting updated successfully');
    const response = {
      success: true, 
      data: {
        fileIds: resumesData.map(r => r.fileId),
        jobId: updatedJob._id,
        numberOfFiles: resumesData.length
      } 
    };
    
    console.log('Resumes API: Returning success response:', response);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Resumes API: Error uploading resumes:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to upload resumes',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

