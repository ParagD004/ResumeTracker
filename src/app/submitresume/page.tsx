"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { databases, storage, ID } from "@/lib/appwrite";
import Link from "next/link";

interface JobPosting {
  _id: string;
  position: string;
  openings: number;
}

export default function SubmitResumePage() {
  // const { id } = useParams();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const router = useRouter();
  const [job, setJob] = useState<JobPosting | null>(null);
  const [resumes, setResumes] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

  useEffect(() => {
    if (!jobId) {
      router.push("/dataEnter");
      return;
    }
    const fetchJobPosting = async () => {
      try {
        // In a real app, you'd fetch from your Next.js API route
        const response = await fetch(`/api/jobpostings/${jobId}`);
        if (!response.ok) throw new Error("Failed to fetch job posting");
        const data = await response.json();
        setJob(data.data);
      } catch (error) {
        console.error("Error fetching job posting:", error);
        router.push("/dataEnter"); // Redirect to a safe page if error occurs
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobPosting();
  }, [jobId, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setResumes((prev) => [...prev, ...filesArray]);
      setUploadProgress((prev) => [
        ...prev,
        ...Array(filesArray.length).fill(0),
      ]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setResumes((prev) => prev.filter((_, i) => i !== index));
    setUploadProgress((prev) => prev.filter((_, i) => i !== index));
  };
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



  const handleSubmit = async () => {
    if (resumes.length === 0) return;
    setIsSubmitting(true);

    try {
      const uploadPromises = resumes.map(async (file, index) => {
        // Use only ID.unique() for fileId
        const uploadedFile = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
          ID.unique(),
          file,
          undefined,
          (progress) => {
            setUploadProgress((prev) => {
              const newProgress = [...prev];
              newProgress[index] = progress.progress;
              return newProgress;
            });
          }
        );
        // TODO: Store mapping { fileId: uploadedFile.$id, jobId, filename: file.name } in your database
        return uploadedFile;
      });

      await Promise.all(uploadPromises);
      alert("Resumes uploaded successfully!");
      setUploadComplete(true);
    } catch (error) {
      console.error("Error uploading resumes:", error);
      alert("Failed to upload resumes");
    } finally {
      setIsSubmitting(false);
    }
  };
  const [uploadComplete, setUploadComplete] = useState(false);

  if (isLoading) {
    return <div className="p-6">Loading job details...</div>;
  }

  if (!job) {
    return (
      <div className="p-6">
        <p>Job posting not found. Please try again.</p>
        <Link href="/dataEnter" className="text-blue-500">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Submit Resumes for: {job.position}
      </h1>
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
              <li
                key={index}
                className="flex items-center justify-between p-3 border rounded"
              >
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
        {!uploadComplete && (
          <button
            onClick={handleSubmit}
            disabled={resumes.length === 0 || isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Uploading..." : "Upload Resumes"}
          </button>
        )}

        <button
          onClick={() => router.push("/dataEnter")}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Cancel
        </button>

        {resumes.length > 0 && uploadComplete && (
          <button
            onClick={() => router.push(`/analyze/${jobId}`)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ml-auto"
          >
            Analyze Resumes
          </button>
        )}
      </div>
    </div>
  );
}
