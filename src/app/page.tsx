// app/page.tsx
'use client';
import Link from 'next/link';
import Footer from '@/components/Footer/page';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Background Image with Overlay */}
      {/* <div 
        className="fixed inset-0 z-0 bg-gray-900"
        style={{
          backgroundImage: `url(/resume.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3 // Adjust opacity as needed
        }}
      /> */}
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          {/* Animated background elements (now on top of the image) */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-900 opacity-20 blur-3xl animate-float"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-900 opacity-20 blur-3xl animate-float-delay"></div>
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-green-900 opacity-20 blur-3xl animate-float"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-20 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Welcome to ResumeTracker
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

          {/* Add some subtle animated elements */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full animate-pulse"></div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}