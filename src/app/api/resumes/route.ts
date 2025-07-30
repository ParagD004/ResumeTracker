import { NextResponse } from 'next/server';
import { serverStorage } from '@/lib/appwrite';
import { ID } from 'appwrite';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('resumes') as File[];
    
    const uploadPromises = files.map(file => 
      serverStorage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
        ID.unique(),
        file
      )
    );

    const results = await Promise.all(uploadPromises);
    
    return NextResponse.json({ 
      success: true, 
      data: results.map(r => r.$id) 
    });
  } catch (error) {
    console.error('Error uploading resumes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload resumes' },
      { status: 500 }
    );
  }
}


















// import connectionToDatabase from "@/lib/mongoose";
// import JobPosting from "@/models/JobPosting";
// import { NextResponse } from "next/server";
// import mongoose from "mongoose";

// export async function POST(request: Request) {
//   try {
//     await connectionToDatabase();
//     const connection = mongoose.connection;
//   console.log("Connection state:", connection.readyState);
//     const { position, department, location, experience, openings, 
//             requiredSkills, description, salary } = await request.json();
    
//     // Convert array back to string for storage if needed
//     const skillsString = Array.isArray(requiredSkills) 
//       ? requiredSkills.join(', ') 
//       : requiredSkills;

//     const newJob = new JobPosting({
//       position,
//       department,
//       location,
//       experience,
//       openings: Number(openings),
//       skills: skillsString,
//       description,
//       salary
//     });

//     await newJob.save();
    
//     return NextResponse.json(
//       { 
//         jobId: newJob._id.toString(),
//         message: "Job created successfully" 
//       }, 
//       { status: 201 }
//     );
    
//   } catch (err: unknown) {
//     console.error('Error details:', err);
//     const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
//}





// import connectionToDatabase from "@/lib/mongoose";
// import User from "@/models/User";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     await connectionToDatabase();
    
//     const { position, department, location, experience, openings, skills, description, salary } = await request.json();
    
//     const newUser = new User({
//       position,
//       department,
//       location,
//       experience,
//       openings,
//       skills,
//       description,
//       salary
//     });

//     await newUser.save();
    
//     return NextResponse.json(newUser, { status: 201 });
    
//   } catch (err: unknown) {
//     console.error('Error details:', err);
    
//     if (err instanceof Error) {
//       console.error('Error message:', err.message);
//       console.error('Stack trace:', err.stack);
//     }
    
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }







// import connectionToDatabase from "@/lib/mongoose";
// import User from "../../../../models/User";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try{
//     await connectionToDatabase();
//     const {position, department, location, experience, openings, skills, description, salary} = await request.json()
//     const newUser = new User({position, department, location, experience, openings, skills, description, salary})
//     await newUser.save()
//     return NextResponse.json(newUser, 
//       {
//         status: 201
//       }
//     )
//   } catch(err){
//     console.log('Error details:',err);
//     if (err instanceof Error) {
//     console.error('Error message:', err.message);
//     console.error('Stack trace:', err.stack);
//   }
// }
// }







// // app/api/resumes/route.ts
// import { MongoClient, ObjectId } from 'mongodb';
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     if (!process.env.MONGODB_URI) {
//       throw new Error('MONGODB_URI environment variable is not set');
//     }

//     const { jobId, resumeFileId, filename } = await request.json();
    
//     const client = await MongoClient.connect(process.env.MONGODB_URI);
//     const db = client.db();
    
//     // Update the job posting with resume reference
//     const result = await db.collection('jobPostings').updateOne(
//       { _id: new ObjectId(jobId) },
//       { 
//          $push: { 
//           resumes: {
//             fileId: resumeFileId,
//             filename,
//             uploadedAt: new Date()
//           }
//         } 
//       }
//     );

//     client.close();

//     if (result.modifiedCount === 0) {
//       return NextResponse.json(
//         { message: 'Job not found or not updated' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: 'Resume association saved' },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error('Error storing resume reference:', error);
//     return NextResponse.json(
//       { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }