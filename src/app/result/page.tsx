"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface ResumeRanking {
  fileId: string;
  name: string;
  rank?: number;
}

export default function ResultPage() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [ranking, setRanking] = useState<ResumeRanking[]>([]);

  useEffect(() => {
    // Get ranking from sessionStorage
    const data = sessionStorage.getItem("resumeRanking");
    if (data) {
      try {
        setRanking(JSON.parse(data));
      } catch {
        setRanking([]);
      }
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Resume Analysis Results</h1>
      {ranking.length === 0 ? (
        <div className="mb-6">No ranking data found.</div>
      ) : (
        <table className="w-full border mb-6">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2 text-left">Rank</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">File ID</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((resume, idx) => (
              <tr key={resume.fileId} className="border-t">
                <td className="p-2">{resume.rank ?? idx + 1}</td>
                <td className="p-2">{resume.name || "Unknown"}</td>
                <td className="p-2">
                  <a
                    href={`https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${resume.fileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link href={`/`} className="text-blue-500">Back to Home</Link>
    </div>
  );
}
