// app/page.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer/page';

export default function Home() {
  // Word-by-word transition effect for heading
  const heading = "Welcome to ResumeTracker";
  const words = heading.split(" ");
  const [visibleWords, setVisibleWords] = React.useState(0);

  React.useEffect(() => {
    let timer;
    if (visibleWords < words.length) {
      timer = setTimeout(() => {
        setVisibleWords(visibleWords + 1);
      }, 900); // 1.5s per word (slower)
    } else {
      // Pause before restarting
      timer = setTimeout(() => {
        setVisibleWords(0);
      }, 1800); // 1.8s pause after full text (slower)
    }
    return () => clearTimeout(timer);
  }, [visibleWords, words.length]);

  return (
  <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
    {/* Content Container - now with full viewport height */}
    <div className="relative z-10 flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center p-8 min-h-[calc(100vh-200px)]"> {/* Added min-h-[calc(100vh-200px)] */}
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-900 opacity-20 blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-900 opacity-20 blur-3xl animate-float-delay"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-green-900 opacity-20 blur-3xl animate-float"></div>
        </div>
        
        {/* Content - centered in the expanded main section */}
        <div className="relative z-20 text-center my-auto"> {/* Changed to my-auto for vertical centering */}
          <h1 className="text-5xl rounded-xl px-2 md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 font-serif">
            {words.map((word, i) => (
              <span
                key={i}
                className={
                  `inline-block relative transition-all duration-200 ease-out ${
                    i < visibleWords
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`
                }
                style={{ marginRight: i < words.length - 1 ? "0.5em" : 0 }}
              >
                <span className="fancy-font drop-shadow-lg">
                  {word}
                </span>
                <span
                  className="absolute left-0 -bottom-2 w-full h-1 pointer-events-none"
                  style={{
                    background:
                      i < visibleWords
                        ? "linear-gradient(90deg, #7f5af0 0%, #2cb67d 100%)"
                        : "transparent",
                    borderRadius: "999px",
                    transition: "background 0.7s cubic-bezier(0.4,0,0.2,1)"
                  }}
                ></span>
              </span>
            ))}
          </h1>
          <p className="text-lg md:text-xl mb-12 text-gray-100 max-w-3xl mx-auto">
            Streamline your hiring process with our powerful recruitment platform
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/admin" 
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
            >
              <span className="relative z-10">Admin Panel</span>
              <span className="text-blue-200">→</span>
            </Link>
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-green-500/30 flex items-center gap-2"
            >
              <span className="relative z-10">Create Job Posting</span>
              <span className="text-green-200">→</span>
            </Link>
          </div>
        </div>
        
        {/* Bottom animated element moved to absolute bottom */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full animate-pulse"></div>
        </div>
      </main>

      {/* Why Choose Us Section */}
      <section className="w-full py-16 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Why Choose ResumeTracker?
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            {/* Left: Features stacked vertically */}
            <div className="md:w-1/2 w-full flex flex-col gap-8 justify-center items-center">
              <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2 w-full max-w-md">
                <div className="text-blue-400 text-2xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                <p className="text-gray-300">
                  Our platform processes resumes 3x faster than competitors.
                </p>
              </div>
              <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 w-full max-w-md">
                <div className="text-purple-400 text-2xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Matching</h3>
                <p className="text-gray-300">
                  Advanced algorithms match candidates to your job requirements with 95% accuracy.
                </p>
              </div>
              <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all duration-300 hover:-translate-y-2 w-full max-w-md">
                <div className="text-green-400 text-2xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-3">Real-Time Analytics</h3>
                <p className="text-gray-300">
                  Get instant insights into your hiring pipeline with our comprehensive dashboard.
                </p>
              </div>
            </div>
            {/* Right: Animation placeholder */}
            <div className="md:w-1/2 w-full flex items-center justify-center">
              <div className="w-full h-96 flex items-center justify-center">
                {/* Add your animation or visual here */}
                <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-purple-700 via-blue-700 to-green-700 opacity-30 animate-pulse shadow-2xl flex items-center justify-center">
                  <span className="text-4xl text-white opacity-80">Animation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                AI-Powered Resume Analysis
              </h2>
              <p className="text-xl text-gray-300">
                Our platform leverages <span className="font-semibold text-blue-400">advanced ChatGPT models</span> to provide deep insights into candidate resumes.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  <span className="text-gray-300">Natural language processing to understand resume context</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  <span className="text-gray-300">Smart matching with job requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  <span className="text-gray-300">Bias detection and reduction algorithms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  <span className="text-gray-300">Automated skill gap analysis</span>
                </li>
              </ul>
              
            </div>
            
            {/* Right Column - Visual/AI Demo */}
            <div className="md:w-1/2 relative">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto">
                  <div className="text-green-400 font-mono text-sm mb-2">AI Analysis Output:</div>
                  <div className="text-gray-300 font-mono text-sm space-y-2">
                    <p><span className="text-blue-400">• Skill Match:</span> Candidate skills closely match job requirements</p>
                    <p><span className="text-blue-400">• Experience Level:</span> Based on seniority level</p>
                    <p><span className="text-blue-400">• Bias Detection:</span> No gender or age bias detected in resume content</p>
                    <p><span className="text-blue-400">• Skill Gap Analysis:</span> Candidates are selected whose skills match the requirements</p>
                    <p><span className="text-blue-400">• Ranking:</span> List of Rankings</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <span className="text-xs text-gray-500">Powered by ChatGPT-4o model</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-900/30 rounded-full blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>


        <Footer />
      </div>
    </div>
  );
}