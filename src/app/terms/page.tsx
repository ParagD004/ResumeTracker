import React from "react";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200 py-16 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-gray-900 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-6">Terms of Service</h1>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Use ResumeTracker for lawful purposes only.</li>
          <li>Do not upload false or misleading information.</li>
          <li>We reserve the right to update or modify these terms at any time.</li>
          <li>By using our platform, you agree to these terms.</li>
        </ul>
        <p className="mt-6 text-sm text-gray-400">For questions, contact us at paragdharmik004@gmail.com.</p>
      </div>
    </main>
  );
}
