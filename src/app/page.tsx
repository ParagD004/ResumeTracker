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
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 min-h-[calc(100vh-200px)] w-full">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-purple-900 opacity-20 blur-3xl animate-float"></div>
            <div className="absolute top-1/3 right-1/4 w-40 h-40 sm:w-96 sm:h-96 rounded-full bg-blue-900 opacity-20 blur-3xl animate-float-delay"></div>
            <div className="absolute bottom-1/4 right-1/3 w-32 h-32 sm:w-80 sm:h-80 rounded-full bg-green-900 opacity-20 blur-3xl animate-float"></div>
          </div>

          {/* Tagline above main heading - creative, themed, white shades background */}
          <div
            className="relative z-30 text-center mb-2 sm:mb-4 flex items-center justify-center"
            style={{ marginTop: '5.5rem', marginBottom: '4rem' }}
          >
            <span className="block text-xl sm:text-3xl md:text-4xl text-[#347188] font-semibold drop-shadow-lg font-mono relative px-6 py-3 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #fff 60%, #f3f6fa 100%)',
                boxShadow: '0 4px 24px 0 rgba(52,113,136,0.08), 0 1.5px 8px 0 rgba(52,113,136,0.10)',
                border: '2px solid #e3e8ee',
                overflow: 'hidden',
              }}
            >
              <span className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                background: 'radial-gradient(circle at 80% 20%, #e3e8ee 0%, transparent 70%)',
                opacity: 0.7,
                zIndex: 0,
              }}></span>
              <span className="relative z-10">HIRE THE BEST</span>
            </span>
            {/* Decorative sparkles */}
            <span className="absolute left-2 top-2 text-yellow-300 text-lg opacity-70 animate-pulse">✦</span>
            <span className="absolute right-2 bottom-2 text-blue-200 text-lg opacity-60 animate-pulse">✦</span>
          </div>

          {/* Content - centered in the expanded main section */}
          <div className="relative z-20 text-center my-auto">
            <h1 className="text-2xl sm:text-5xl rounded-xl px-2 md:text-6xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 font-serif">
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
            <p className="text-xs sm:text-lg md:text-xl mb-6 sm:mb-12 text-gray-100 max-w-xs sm:max-w-3xl mx-auto">
              Streamline your hiring process with our powerful recruitment platform
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
              <Link 
                href="/dashboard" 
                className="w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-4 bg-[#347188] text-white rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2 text-xs sm:text-base"
              >
                <span className="relative z-10">Create Job Posting</span>
                <span className="text-green-200">→</span>
              </Link>
            </div>
          </div>

          {/* Bottom animated element moved to absolute bottom */}
          <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center">
            <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full animate-pulse"></div>
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