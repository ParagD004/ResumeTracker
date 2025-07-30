'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { databases, storage, ID } from '@/lib/appwrite';
import Link from 'next/link';

interface JobPosting {
  _id: string;
  position: string;
  openings: number;
}

export default function SubmitResumePage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<JobPosting | null>(null);
  const [resumes, setResumes] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

  useEffect(() => {
    const fetchJobPosting = async () => {
      try {
        // In a real app, you'd fetch from your Next.js API route
        const response = await fetch(`/api/jobpostings/${id}`);
        if (!response.ok) throw new Error('Failed to fetch job posting');
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error('Error fetching job posting:', error);
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobPosting();
  }, [id, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setResumes(prev => [...prev, ...filesArray]);
      setUploadProgress(prev => [...prev, ...Array(filesArray.length).fill(0)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setResumes(prev => prev.filter((_, i) => i !== index));
    setUploadProgress(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (resumes.length === 0) return;
    setIsSubmitting(true);

    try {
      const uploadPromises = resumes.map(async (file, index) => {
        return await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
          ID.unique(),
          file,
          undefined,
          (progress) => {
            setUploadProgress(prev => {
              const newProgress = [...prev];
              newProgress[index] = progress.progress;
              return newProgress;
            });
          }
        );
      });

      await Promise.all(uploadPromises);
      alert('Resumes uploaded successfully!');
      setResumes([]);
      setUploadProgress([]);
    } catch (error) {
      console.error('Error uploading resumes:', error);
      alert('Failed to upload resumes');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading job details...</div>;
  }

  if (!job) {
    return (
      <div className="p-6">
        <p>Job posting not found</p>
        <Link href="/" className="text-blue-500">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Submit Resumes for: {job.position}</h1>
      <p className="mb-6">Openings: {job.openings}</p>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Resumes (PDF only)
        </label>
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      {resumes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-3">Selected Resumes</h2>
          <ul className="space-y-3">
            {resumes.map((file, index) => (
              <li key={index} className="flex items-center justify-between p-3 border rounded">
                <div className="flex-1">
                  <p className="text-sm font-medium">{file.name}</p>
                  {uploadProgress[index] > 0 && uploadProgress[index] < 100 && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${uploadProgress[index]}%` }}
                      ></div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={handleSubmit}
          disabled={resumes.length === 0 || isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Uploading...' : 'Upload Resumes'}
        </button>

        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Cancel
        </button>

        {resumes.length > 0 && (
          <button
            onClick={() => router.push(`/analyze/${id}`)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ml-auto"
          >
            Analyze Resumes
          </button>
        )}
      </div>
    </div>
  );
}

















// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { ID, Storage } from 'appwrite';
// import { storage } from '@/lib/appwrite';

// interface JobData {
//   position: string;
//   department: string;
//   location: string;
//   experience: string;
//   openings: number;
//   requiredSkills: string[];
//   description: string;
//   salary: string;
// }

// export default function ResumeUploadPage() {
//   const [resumes, setResumes] = useState<File[]>([]);
//   const [jobData, setJobData] = useState<JobData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [uploadProgress, setUploadProgress] = useState<number>(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadComplete, setUploadComplete] = useState(false);
//   const searchParams = useSearchParams();
//   const jobId = searchParams.get('jobId');

//   useEffect(() => {
//     const fetchJobData = async () => {
//       if (!jobId) {
//         setError('No job ID provided');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(`/api/jobs/${jobId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch job data');
//         }
//         const data: JobData = await response.json();
//         setJobData(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unknown error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobData();
//   }, [jobId]);

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setResumes(Array.from(e.target.files));
//       setUploadComplete(false); // Reset upload status when new files are selected
//     }
//   };

//   const uploadResumes = async () => {
//     if (!resumes.length || !jobId) return;
    
//     setIsUploading(true);
//     setError(null);
    
//     try {
//       // Upload each resume to Appwrite Storage
//       for (const resume of resumes) {
//         const file = await storage.createFile(
//           process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
//           ID.unique(),
//           resume,
//           undefined,
//           (progress) => {
//             setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
//           }
//         );

//         // Associate the resume with the job in MongoDB
//         await fetch('/api/resumes', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             jobId,
//             resumeFileId: file.$id,
//             filename: resume.name,
//             uploadedAt: new Date().toISOString(),
//           }),
//         });
//       }
      
//       setUploadComplete(true);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to upload resumes');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
//           <p>Loading job details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="bg-white rounded-lg shadow p-6 text-center text-red-500">
//           <p>Error: {error}</p>
//           <Link href="/dashboard" className="mt-4 inline-block text-blue-600 hover:underline">
//             Back to Dashboard
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (!jobData) {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="bg-white rounded-lg shadow p-6 text-center">
//           <p>No job data available</p>
//           <Link href="/dashboard" className="mt-4 inline-block text-blue-600 hover:underline">
//             Back to Dashboard
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-2xl font-bold mb-4 text-gray-600">Upload Resumes</h2>
//         <p className="text-gray-600 mb-6">
//           Upload PDF resumes to analyze and rank against the job requirements
//         </p>

//         {/* Upload Area */}
//         <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-8">
//           <input
//             type="file"
//             id="resume-upload"
//             className="hidden"
//             accept=".pdf,.doc,.docx"
//             multiple
//             onChange={handleFileUpload}
//             disabled={isUploading}
//           />
//           <label
//             htmlFor="resume-upload"
//             className={`cursor-pointer flex flex-col items-center justify-center ${isUploading ? 'opacity-50' : ''}`}
//           >
//             <svg
//               className="w-12 h-12 text-gray-400 mb-3"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//               />
//             </svg>
//             <p className="text-gray-600 mb-1">
//               <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
//             </p>
//             <p className="text-gray-500 text-sm">PDF, DOC, DOCX files accepted</p>
//           </label>

//           {resumes.length > 0 && (
//             <div className="mt-4">
//               <p className="text-sm text-gray-600">
//                 Selected {resumes.length} file{resumes.length > 1 ? 's' : ''}
//               </p>
//               <ul className="text-xs text-gray-500 mt-1">
//                 {resumes.map((file, index) => (
//                   <li key={index}>{file.name}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {isUploading && (
//             <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
//               <div
//                 className="bg-blue-600 h-2.5 rounded-full"
//                 style={{ width: `${uploadProgress}%` }}
//               ></div>
//             </div>
//           )}

//           {uploadComplete && (
//             <div className="mt-4 text-green-600 font-medium">
//               Upload completed successfully!
//             </div>
//           )}
//         </div>

//         {/* Upload Button */}
//         <div className="flex justify-center mb-8">
//           <button
//             onClick={uploadResumes}
//             disabled={resumes.length === 0 || isUploading}
//             className={`px-6 py-2 rounded-md text-white ${resumes.length > 0 && !isUploading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
//           >
//             {isUploading ? 'Uploading...' : 'Upload Resumes'}
//           </button>
//         </div>

//         {/* Job Summary */}
//         <div className="bg-gray-50 rounded-lg p-4">
//           <h3 className="font-bold text-lg mb-3 text-gray-600">Job Summary</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <p className="font-medium">Position: <span className="font-normal">{jobData.position}</span></p>
//               <p className="font-medium">Department: <span className="font-normal">{jobData.department}</span></p>
//             </div>
//             <div>
//               <p className="font-medium">Experience: <span className="font-normal">{jobData.experience}</span></p>
//               <p className="font-medium">Openings: <span className="font-normal">{jobData.openings}</span></p>
//             </div>
//           </div>
//           <div className="mt-3">
//             <p className="font-medium">Location: <span className="font-normal">{jobData.location}</span></p>
//             <p className="font-medium">Salary: <span className="font-normal">{jobData.salary}</span></p>
//           </div>
//           <div className="mt-3">
//             <p className="font-medium text-gray-500">Required Skills:</p>
//             <p className="text-gray-700">{jobData.requiredSkills.join(', ')}</p>
//           </div>
//           <div className="mt-3">
//             <p className="font-medium text-gray-500">Description:</p>
//             <p className="text-gray-700">{jobData.description}</p>
//           </div>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex justify-between mt-8">
//           <Link
//             href="/dashboard"
//             className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//           >
//             Back to Dashboard
//           </Link>
//           <Link
//             href={`/analyze?jobId=${jobId}`}
//             className={`px-6 py-2 rounded-md text-white ${uploadComplete ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
//             aria-disabled={!uploadComplete}
//           >
//             Analyze Resumes
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }













// //Give data from api end point in the form of
// // {
// //   "position": "Data Scientist",
// //   "company": "Indeed",
// //   "experienceLevel": "entry",
// //   "openings": 1,
// //   "requiredSkills": ["Python", "Machine Learning", "Data Analysis", "SQL"]
// // }

// "use client";

// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// interface JobData {
//   position: string;
//   company: string;
//   experienceLevel: string;
//   openings: number;
//   requiredSkills: string[];
// }

// export default function ResumeUploadPage() {
//   const [resumes, setResumes] = useState<File[]>([]);
//   const [jobData, setJobData] = useState<JobData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchJobData = async () => {
//       try {
//         // Replace with your actual API endpoint
//         const response = await fetch('/api/job-details');
//         if (!response.ok) {
//           throw new Error('Failed to fetch job data');
//         }
//         const data: JobData = await response.json();
//         setJobData(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unknown error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobData();
//   }, []);

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setResumes(Array.from(e.target.files));
//     }
//   };

//   if (loading) {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
//           <p>Loading job details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="bg-white rounded-lg shadow p-6 text-center text-red-500">
//           <p>Error: {error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!jobData) {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="bg-white rounded-lg shadow p-6 text-center">
//           <p>No job data available</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-2xl font-bold mb-4 text-gray-600">Upload Resumes</h2>
//         <p className="text-gray-600 mb-6">
//           Upload PDF resumes to analyze and rank against the job requirements
//         </p>

//         {/* Upload Area */}
//         <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-8">
//           <input
//             type="file"
//             id="resume-upload"
//             className="hidden"
//             accept=".pdf"
//             multiple
//             onChange={handleFileUpload}
//           />
//           <label
//             htmlFor="resume-upload"
//             className="cursor-pointer flex flex-col items-center justify-center"
//           >
//             <svg
//               className="w-12 h-12 text-gray-400 mb-3"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//               />
//             </svg>
//             <p className="text-gray-600 mb-1">
//               <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
//             </p>
//             <p className="text-gray-500 text-sm">PDF files only</p>
//           </label>
//         </div>

//         {/* Job Summary */}
//         <div className="bg-gray-50 rounded-lg p-4">
//           <h3 className="font-bold text-lg mb-3 text-gray-600">Job Summary</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <p className="font-medium">Position: <span className="font-normal">{jobData.position}</span></p>
//               <p className="font-medium">Company: <span className="font-normal">{jobData.company}</span></p>
//             </div>
//             <div>
//               <p className="font-medium">Experience: <span className="font-normal">{jobData.experienceLevel}</span></p>
//               <p className="font-medium">Openings: <span className="font-normal">{jobData.openings}</span></p>
//             </div>
//           </div>
//           <div className="mt-3">
//             <p className="font-medium text-gray-500">Required Skills:</p>
//             <p className="text-gray-700">{jobData.requiredSkills.join(', ')}</p>
//           </div>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex justify-between mt-8">
//           <Link
//             href="/dashboard"
//             className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//           >
//             Back
//           </Link>
//           <Link
//             href="/analyze"
//             className={`px-6 py-2 rounded-md text-white ${resumes.length > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
//             aria-disabled={resumes.length === 0}
//           >
//             Next
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }