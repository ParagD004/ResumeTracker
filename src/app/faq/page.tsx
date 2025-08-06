import React from "react";

const faqs = [
  {
    q: "What is ResumeTracker?",
    a: "ResumeTracker is an AI-powered platform for analyzing and matching resumes to job requirements."
  },
  {
    q: "Is my data safe?",
    a: "Yes, your data is securely stored and never shared with third parties."
  },
  {
    q: "How does the AI analysis work?",
    a: "We use advanced natural language processing models to analyze resume content and match skills."
  },
  {
    q: "Can I delete my data?",
    a: "Yes, you can request deletion of your data at any time by contacting us."
  }
];

export default function FAQ() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200 py-16 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-gray-900 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-6">Frequently Asked Questions</h1>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h2 className="text-lg font-semibold text-purple-400 mb-2">{faq.q}</h2>
              <p className="text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-gray-400">For more questions, contact us at paragdharmik004@gmail.com.</p>
      </div>
    </main>
  );
}
