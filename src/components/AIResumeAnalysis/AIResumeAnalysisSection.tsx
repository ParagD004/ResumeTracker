import React, { useRef, useEffect, useState } from "react";

const analysisPoints = [
  { label: "Skill Match", value: "Candidate skills closely match job requirements" },
  { label: "Experience Level", value: "Based on seniority level" },
  { label: "Bias Detection", value: "No gender or age bias detected in resume content" },
  { label: "Skill Gap Analysis", value: "Candidates are selected whose skills match the requirements" },
  { label: "Ranking", value: "List of Rankings" },
];

function AnimatedAIOutput() {
  const [visible, setVisible] = useState(0);
  const hasAnimated = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    function showNext() {
      setVisible((v) => {
        if (v < analysisPoints.length) {
          timer = setTimeout(showNext, 500);
          return v + 1;
        }
        return v;
      });
    }
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          timer = setTimeout(showNext, 500);
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto">
      <div className="text-green-400 font-mono text-sm mb-2">AI Analysis Output:</div>
      <div className="text-gray-300 font-mono text-sm space-y-2">
        {analysisPoints.map((point, i) => (
          <p
            key={point.label}
            className={`transition-all duration-700 ${i < visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
            style={{ transitionDelay: i < visible ? `${i * 200}ms` : '0ms' }}
          >
            <span className="text-blue-400">• {point.label}:</span> {point.value}
          </p>
        ))}
      </div>
    </div>
  );
}

const AIResumeAnalysisSection = () => (
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
        {/* Right Column - Visual/AI Demo with animation */}
        <div className="md:w-1/2 relative">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <AnimatedAIOutput />
            <div className="mt-4 flex justify-end">
              <span className="text-xs text-gray-500">Powered by ChatGPT-4o model</span>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-900/30 rounded-full blur-xl -z-10"></div>
        </div>
      </div>
    </div>
  </section>
);

export default AIResumeAnalysisSection;
