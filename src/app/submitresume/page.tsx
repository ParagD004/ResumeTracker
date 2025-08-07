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
      // Merge new files with existing, filter out duplicates by name and size
      setResumes((prev) => {
        const allFiles = [...prev, ...filesArray];
        const uniqueFiles = allFiles.filter((file, idx, arr) =>
          arr.findIndex(f => f.name === file.name && f.size === file.size) === idx
        );
        return uniqueFiles;
      });
      setUploadProgress((prev) => {
        // If new files are added, add progress for only the truly new files
        const allFiles = [...resumes, ...filesArray];
        const uniqueFiles = allFiles.filter((file, idx, arr) =>
          arr.findIndex(f => f.name === file.name && f.size === file.size) === idx
        );
        // Progress array should match uniqueFiles length
        // Fill with 0 for new files
        const newLength = uniqueFiles.length;
        const prevLength = prev.length;
        if (newLength > prevLength) {
          return [...prev, ...Array(newLength - prevLength).fill(0)];
        }
        return prev.slice(0, newLength);
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setResumes((prev) => prev.filter((_, i) => i !== index));
    setUploadProgress((prev) => prev.filter((_, i) => i !== index));
  };



  const handleSubmit = async () => {
    if (resumes.length === 0) return;
    setIsSubmitting(true);

    try {
      // Upload files to Appwrite and collect metadata
      const uploadPromises = resumes.map(async (file, index) => {
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
        return {
          fileId: uploadedFile.$id,
          filename: file.name,
          file // keep the file for FormData
        };
      });

      const uploadedFilesMeta = await Promise.all(uploadPromises);

      // Prepare FormData for API
      const formData = new FormData();
      uploadedFilesMeta.forEach((meta) => {
        formData.append('resumes', meta.file, meta.filename);
      });
      if (jobId) {
        formData.append('jobId', jobId);
      }

      // Send metadata to /api/resumes
      const response = await fetch('/api/resumes', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to store resume metadata');
      }

      alert('Resumes uploaded and metadata stored successfully!');
      setUploadComplete(true);
    } catch (error) {
      console.error('Error uploading resumes:', error);
      alert('Failed to upload resumes');
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
      <div className="p-6 bg-[#05041c] rounded-xl shadow-2xl shadow-[#347188]/20 border border-[#347188]/30 mt-20">
        <p className="text-gray-100">Job posting not found. Please try again.</p>
        <Link href="/dataEnter" className="text-blue-400 hover:text-blue-300 underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 mt-10 sm:mt-20 bg-[#05041c] rounded-xl shadow-2xl shadow-[#347188]/20 border border-[#347188]/30 w-full">
      <h1 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4 text-blue-200 drop-shadow-lg">
        Submit Resumes for: <span className="text-blue-400">{job.position}</span>
      </h1>
      <p className="mb-4 sm:mb-6 text-blue-300 text-sm sm:text-base">Openings: {job.openings}</p>

      <div className="mb-6 sm:mb-8">
        <label className="block text-sm sm:text-base font-semibold text-blue-300 mb-2">
          Upload Resumes (PDF only)
        </label>
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileChange}
          className="block w-full text-xs sm:text-sm text-gray-100 bg-slate-800 border border-slate-600 rounded-lg p-2 sm:p-3 focus:ring-2 focus:ring-[#347188] focus:border-[#347188] transition-all duration-300 file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-[#347188] file:text-white hover:file:bg-green-700"
        />
      </div>

      {resumes.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-blue-200">Selected Resumes</h2>
          <ul className="space-y-2 sm:space-y-3">
            {resumes.map((file, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 border border-blue-700 rounded-lg bg-slate-900"
              >
                <div className="flex-1 w-full">
                  <p className="text-xs sm:text-sm font-medium text-gray-100">{file.name}</p>
                  {uploadProgress[index] > 0 && uploadProgress[index] < 100 && (
                    <div className="w-full bg-blue-900 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-400 h-2 rounded-full"
                        style={{ width: `${uploadProgress[index]}%` }}
                      ></div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-400 hover:text-red-600 mt-2 sm:mt-0 sm:ml-4 font-semibold"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        {!uploadComplete && (
          <button
            onClick={handleSubmit}
            disabled={resumes.length === 0 || isSubmitting}
            className="w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-3 bg-[#347188] text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-[#347188]/20 hover:shadow-xl hover:shadow-[#347188]/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-xs sm:text-base"
          >
            <span className="relative z-10">{isSubmitting ? "Uploading..." : "Upload Resumes"}</span>
            {!isSubmitting && <span className="transform group-hover:translate-x-1 transition-transform">→</span>}
          </button>
        )}

        <button
          onClick={() => router.push("/dataEnter")}
          className="w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-3 bg-slate-800 text-blue-200 font-bold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/40 text-xs sm:text-base"
        >
          Cancel
        </button>

        {resumes.length > 0 && uploadComplete && (
          <>
            <button
              onClick={async () => {
                if (!jobId) return;
                setIsSubmitting(true);
                try {
                  // Call analyze-resumes API
                  const response = await fetch('/api/analyze-resumes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ jobId })
                  });
                  const result = await response.json();
                  if (!result.success) {
                    alert(result.error || 'Analysis failed');
                    setIsSubmitting(false);
                    return;
                  }
                  // Store result in sessionStorage and redirect
                  sessionStorage.setItem('resumeRanking', JSON.stringify(result.data));
                  router.push(`/result?jobId=${jobId}`);
                } catch (error) {
                  alert('Failed to analyze resumes');
                  setIsSubmitting(false);
                }
              }}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/40 sm:ml-auto disabled:bg-green-300 disabled:cursor-not-allowed text-xs sm:text-base"
            >
              {isSubmitting ? 'Analyzing...' : 'Analyze Resumes'}
            </button>
            {isSubmitting && (
              <div className="flex items-center ml-0 sm:ml-4">
                <svg className="animate-spin h-5 w-5 text-green-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span className="text-green-600 text-xs sm:text-base">Analyzing resumes...</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
