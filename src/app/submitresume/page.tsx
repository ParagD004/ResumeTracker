"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ID, Storage } from 'appwrite';
import { storage } from '@/lib/appwrite'; // Your Appwrite initialization file

interface JobData {
  position: string;
  department: string;
  location: string;
  experience: string;
  openings: number;
  requiredSkills: string[];
  description: string;
  salary: string;
}

export default function ResumeUploadPage() {
  const [resumes, setResumes] = useState<File[]>([]);
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId');

  useEffect(() => {
    const fetchJobData = async () => {
      if (!jobId) {
        setError('No job ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job data');
        }
        const data: JobData = await response.json();
        setJobData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [jobId]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResumes(Array.from(e.target.files));
      setUploadComplete(false); // Reset upload status when new files are selected
    }
  };

  const uploadResumes = async () => {
    if (!resumes.length || !jobId) return;
    
    setIsUploading(true);
    setError(null);
    
    try {
      // Upload each resume to Appwrite Storage
      for (const resume of resumes) {
        const file = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
          ID.unique(),
          resume,
          undefined,
          (progress) => {
            setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
          }
        );

        // Associate the resume with the job in MongoDB
        await fetch('/api/resumes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jobId,
            resumeFileId: file.$id,
            filename: resume.name,
            uploadedAt: new Date().toISOString(),
          }),
        });
      }
      
      setUploadComplete(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload resumes');
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6 text-center text-red-500">
          <p>Error: {error}</p>
          <Link href="/dashboard" className="mt-4 inline-block text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p>No job data available</p>
          <Link href="/dashboard" className="mt-4 inline-block text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-600">Upload Resumes</h2>
        <p className="text-gray-600 mb-6">
          Upload PDF resumes to analyze and rank against the job requirements
        </p>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-8">
          <input
            type="file"
            id="resume-upload"
            className="hidden"
            accept=".pdf,.doc,.docx"
            multiple
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <label
            htmlFor="resume-upload"
            className={`cursor-pointer flex flex-col items-center justify-center ${isUploading ? 'opacity-50' : ''}`}
          >
            <svg
              className="w-12 h-12 text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-gray-600 mb-1">
              <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-gray-500 text-sm">PDF, DOC, DOCX files accepted</p>
          </label>

          {resumes.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Selected {resumes.length} file{resumes.length > 1 ? 's' : ''}
              </p>
              <ul className="text-xs text-gray-500 mt-1">
                {resumes.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

          {isUploading && (
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          {uploadComplete && (
            <div className="mt-4 text-green-600 font-medium">
              Upload completed successfully!
            </div>
          )}
        </div>

        {/* Upload Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={uploadResumes}
            disabled={resumes.length === 0 || isUploading}
            className={`px-6 py-2 rounded-md text-white ${resumes.length > 0 && !isUploading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            {isUploading ? 'Uploading...' : 'Upload Resumes'}
          </button>
        </div>

        {/* Job Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-bold text-lg mb-3 text-gray-600">Job Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Position: <span className="font-normal">{jobData.position}</span></p>
              <p className="font-medium">Department: <span className="font-normal">{jobData.department}</span></p>
            </div>
            <div>
              <p className="font-medium">Experience: <span className="font-normal">{jobData.experience}</span></p>
              <p className="font-medium">Openings: <span className="font-normal">{jobData.openings}</span></p>
            </div>
          </div>
          <div className="mt-3">
            <p className="font-medium">Location: <span className="font-normal">{jobData.location}</span></p>
            <p className="font-medium">Salary: <span className="font-normal">{jobData.salary}</span></p>
          </div>
          <div className="mt-3">
            <p className="font-medium text-gray-500">Required Skills:</p>
            <p className="text-gray-700">{jobData.requiredSkills.join(', ')}</p>
          </div>
          <div className="mt-3">
            <p className="font-medium text-gray-500">Description:</p>
            <p className="text-gray-700">{jobData.description}</p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Link
            href="/dashboard"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Back to Dashboard
          </Link>
          <Link
            href={`/analyze?jobId=${jobId}`}
            className={`px-6 py-2 rounded-md text-white ${uploadComplete ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
            aria-disabled={!uploadComplete}
          >
            Analyze Resumes
          </Link>
        </div>
      </div>
    </div>
  );
}













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