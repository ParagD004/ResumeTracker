import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200 py-16 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-gray-900 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-6">Privacy Policy</h1>
        <p className="mb-4">Your privacy is important to us. This policy explains how ResumeTracker collects, uses, and protects your information.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>We only collect information necessary for providing our services.</li>
          <li>Your data is never sold or shared with third parties.</li>
          <li>All resume data is securely stored and processed.</li>
          <li>You may request deletion of your data at any time.</li>
        </ul>
        <p className="mt-6 text-sm text-gray-400">For questions, contact us at paragdharmik004@gmail.com.</p>
      </div>
    </main>
  );
}
