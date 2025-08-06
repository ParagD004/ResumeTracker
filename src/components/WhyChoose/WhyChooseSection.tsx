import React from "react";
import { useRef, useEffect, useState } from "react";

function WhyChooseSection() {
  return (
    <section className="w-full py-16 bg-gray-800/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Why Choose ResumeTracker?
        </h2>
        <AnimatedFeatures />
      </div>
    </section>
  );
}

function AnimatedFeatures() {
  const features = [
    {
      icon: <div className="text-blue-400 text-2xl mb-4">⚡</div>,
      title: "Lightning Fast",
      desc: "Our platform processes resumes 3x faster than competitors.",
      color: "hover:border-blue-500"
    },
    {
      icon: <div className="text-purple-400 text-2xl mb-4">🔍</div>,
      title: "AI-Powered Matching",
      desc: "Advanced algorithms match candidates to your job requirements with 95% accuracy.",
      color: "hover:border-purple-500"
    },
    {
      icon: <div className="text-green-400 text-2xl mb-4">📊</div>,
      title: "Real-Time Analytics",
      desc: "Get instant insights into your hiring pipeline with our comprehensive dashboard.",
      color: "hover:border-green-500"
    }
  ];

  const containerRef = useRef(null);
  const [visible, setVisible] = useState([false, false, false]);

  const [paused, setPaused] = useState(false);
  useEffect(() => {
    let observer;
    let loopTimeout: ReturnType<typeof setTimeout>;
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    const animateFeatures = () => {
      if (paused) return;
      features.forEach((_, i) => {
        const t = setTimeout(() => {
          setVisible((prev) => {
            const arr = [...prev];
            arr[i] = true;
            return arr;
          });
        }, i * 400);
        timeouts.push(t);
      });
      // After all are visible, reset and loop
      loopTimeout = setTimeout(() => {
        setVisible([false, false, false]);
        setTimeout(animateFeatures, 400);
      }, features.length * 400 + 1200);
      timeouts.push(loopTimeout);
    };
    observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateFeatures();
        } else {
          setVisible([false, false, false]);
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
      timeouts.forEach(clearTimeout);
    };
  }, [paused]);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-stretch" ref={containerRef}>
      {/* Left: Features stacked vertically */}
      <div className="md:w-1/2 w-full flex flex-col gap-8 justify-center items-center">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`bg-gray-800/70 p-6 rounded-xl border border-gray-700 ${f.color} transition-all duration-700 w-full max-w-md
              ${visible[i] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}
            `}
            style={{ transitionDelay: visible[i] ? `${i * 200}ms` : '0ms' }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {f.icon}
            <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
            <p className="text-gray-300">{f.desc}</p>
          </div>
        ))}
      </div>
      {/* Right: Show final.jpg image */}
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <div className="w-full h-96 flex items-center justify-center">
          <img
            src="/final.jpg"
            alt="ResumeTracker Visual"
            className="w-72 h-72 rounded-3xl object-cover shadow-2xl border-4 border-gray-700"
            style={{ background: '#222' }}
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
      </div>
    </div>
  );
}

export default WhyChooseSection;
