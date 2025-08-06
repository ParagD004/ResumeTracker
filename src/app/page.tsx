// app/page.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer/page';
import WhyChooseSection from '@/components/WhyChoose/WhyChooseSection';
import AIResumeAnalysisSection from '@/components/AIResumeAnalysis/AIResumeAnalysisSection';

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
        <main className="flex-1 flex flex-col items-center justify-center p-8 min-h-[calc(100vh-200px)]">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-900 opacity-20 blur-3xl animate-float"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-900 opacity-20 blur-3xl animate-float-delay"></div>
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-green-900 opacity-20 blur-3xl animate-float"></div>
          </div>

          {/* Tagline above main heading */}
          <div className="relative z-30 text-center mb-4" style={{ marginTop: '4.5rem', marginBottom: '4rem' }}>
            <span className="block text-3xl md:text-4xl text-[#347188] font-semibold drop-shadow-lg">Hire the best</span>
          </div>

          {/* Content - centered in the expanded main section */}
          <div className="relative z-20 text-center my-auto">
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
                </span>
              ))}
            </h1>
            <p className="text-lg md:text-xl mb-12 text-gray-100 max-w-3xl mx-auto">
              Streamline your hiring process with our powerful recruitment platform
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {/* <Link 
                href="/admin" 
                className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
              >
                <span className="relative z-10">Admin Panel</span>
                <span className="text-blue-200">→</span>
              </Link> */}
              <Link 
                href="/dashboard" 
                className="px-8 py-4 bg-[#347188] text-white rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-green-500/30 flex items-center gap-2"
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
        <WhyChooseSection />

        <AIResumeAnalysisSection />

        <Footer />
      </div>
    </div>
  );
}