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


//submitresume/page.tsx

//   const handleSubmit = async () => {
//   if (resumes.length === 0) return;
//   setIsSubmitting(true);

//   try {
//     // First upload to Appwrite with progress tracking
//     const uploadPromises = resumes.map(async (file, index) => {
//       const uploadedFile = await storage.createFile(
//         process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
//         ID.unique(),
//         file,
//         undefined,
//         (progress) => {
//           setUploadProgress((prev) => {
//             const newProgress = [...prev];
//             newProgress[index] = progress.progress;
//             return newProgress;
//           });
//         }
//       );
//       return { fileId: uploadedFile.$id, filename: file.name };
//     });

//     const uploadedFiles = await Promise.all(uploadPromises);

//     // Then send metadata to your API to store in MongoDB
//     const response = await fetch('/api/resume', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         jobId,
//         resumes: uploadedFiles,
//       }),
//     });

//     const result = await response.json();
    
//     if (!response.ok) {
//       throw new Error(result.error || 'Failed to store resume metadata');
//     }

//     alert("Resumes uploaded and metadata stored successfully!");
//     setUploadComplete(true);
//   } catch (error) {
//     console.error("Error uploading resumes:", error);
//     alert("Failed to upload resumes");
//   } finally {
//     setIsSubmitting(false);
//   }
// };
