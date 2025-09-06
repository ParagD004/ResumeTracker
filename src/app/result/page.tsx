"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface ResumeRanking {
  fileId: string;
  name: string;
  rank?: number;
 score?: number;
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

  // Sort by score descending before rendering
  const sortedRanking = [...ranking].sort((a, b) => {
    if (typeof a.score !== "number" && typeof b.score !== "number") return 0;
    if (typeof a.score !== "number") return 1;
    if (typeof b.score !== "number") return -1;
    return b.score - a.score;
  });

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 mt-16 mb-10 bg-[#05041c] rounded-2xl shadow-2xl shadow-[#347188]/20 border border-[#347188]/30">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2  drop-shadow-lg text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-serif rounded-xl px-2">
          Resume Analysis Results
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full animate-pulse mb-2"></div>
        <p className="text-blue-300 text-center text-lg sm:text-xl max-w-xl">See how your resumes rank for this job posting!</p>
      </div>

      {sortedRanking.length === 0 ? (
        <div className="mb-6 text-blue-400 text-center bg-slate-900 rounded-lg p-4 shadow-md">No ranking data found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full mb-8 rounded-xl overflow-hidden shadow-lg border border-[#347188]/40 bg-gradient-to-br from-[#05041c] via-[#1a2253] to-[#347188]/10">
            <thead>
              <tr className="bg-[#347188] text-white">
                <th className="p-3 text-left font-bold">Rank</th>
                <th className="p-3 text-left font-bold">Name</th>
                <th className="p-3 text-left font-bold">Score</th>
                <th className="p-3 text-left font-bold">Resume</th>
              </tr>
            </thead>
            <tbody>
              {sortedRanking.map((resume, idx) => (
                <tr key={resume.fileId} className="border-t border-[#347188]/20 bg-slate-900 hover:bg-[#1a2253] transition-colors">
                  <td className="p-3 text-blue-300 font-semibold text-lg">{idx + 1}</td>
                  <td className="p-3 text-gray-100 font-medium">{resume.name || "Unknown"}</td>
                  <td className="p-3 text-green-400 font-bold text-lg">{typeof resume.score === "number" ? `${resume.score}/100` : "-"}</td>
                  <td className="p-3 flex gap-2">
                    <a
                      href={`https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${resume.fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#347188] text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-green-500/30 font-semibold"
                    >
                      View PDF
                    </a>
                    <a
                      href={`https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${resume.fileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`}
                      download
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 transition-all duration-300 shadow-md hover:shadow-green-500/30 font-semibold"
                    >
                      Download PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <Link href={`/`} className="px-6 py-3 bg-[#347188] text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 shadow-lg shadow-[#347188]/20 hover:shadow-xl hover:shadow-[#347188]/40">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
