import Head from 'next/head';
import Link from 'next/link';
import Footer from '@/components/Footer/page';

const About = () => {
  return (
    <div className="min-h-screen bg-[#05041c] w-full">
      <Head>
        <title>About Resume Tracker - AI-Powered Resume Screening</title>
        <meta name="description" content="Learn how Resume Tracker uses AI to streamline your recruitment process by analyzing and shortlisting the best resumes for your job openings." />
      </Head>

      {/* Home link at the top, themed and responsive */}
      <div className="w-full flex flex-wrap justify-start px-2 xs:px-4 pt-4 mb-2 sm:mb-4">
        <Link
          href="/"
          className="px-4 py-2 bg-[#0a092b] border border-[#347188]/30 rounded-lg text-blue-400 font-bold shadow-md hover:bg-[#347188] hover:text-white transition-all duration-300 text-xs xs:text-sm sm:text-base"
          style={{ minWidth: '70px', textAlign: 'center' }}
        >
          <span className="mr-2">←</span>Home
        </Link>
      </div>

      <main className="w-full max-w-4xl mx-auto px-2 xs:px-4 sm:px-8 py-4 sm:py-10">
        <section className="w-full text-center mb-8 sm:mb-16 bg-[#05041c] rounded-xl shadow-2xl shadow-[#347188]/20 border border-[#347188]/30 p-2 xs:p-3 sm:p-10">
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-4xl font-bold text-blue-200 mb-2 xs:mb-3 sm:mb-6 drop-shadow-lg">About Resume Tracker</h1>
          <p className="text-xs xs:text-sm sm:text-lg md:text-xl text-blue-300 mb-4 xs:mb-5 sm:mb-8">
            Resume Tracker uses AI to help recruiters quickly find the best candidates for any job opening. Upload resumes, set your criteria, and let our platform do the heavy lifting.
          </p>
          <div className="flex flex-col xs:flex-row justify-center gap-3 xs:gap-6">
            <Link href="/dashboard" className="w-full xs:w-auto px-4 xs:px-6 sm:px-8 py-2 xs:py-3 bg-[#347188] text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-[#347188]/20 hover:shadow-xl hover:shadow-[#347188]/40 flex items-center justify-center gap-2 text-xs xs:text-sm sm:text-base">
              <span className="relative z-10">Try It Now</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </section>

        <section className="w-full mb-8 sm:mb-16">
          <h2 className="text-base xs:text-lg sm:text-2xl md:text-3xl font-semibold text-blue-200 mb-4 xs:mb-5 sm:mb-8">How Resume Tracker Works</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-4 sm:gap-8">
            <div className="bg-[#0a092b] p-2 xs:p-4 sm:p-6 rounded-lg shadow-md border border-[#347188]/30">
              <div className="text-blue-400 text-base xs:text-lg sm:text-2xl mb-1 xs:mb-2 sm:mb-4 font-bold">1</div>
              <h3 className="text-xs xs:text-sm sm:text-lg md:text-xl font-medium text-blue-200 mb-1 xs:mb-2 sm:mb-3">Input Job Requirements</h3>
              <p className="text-blue-300 text-xs xs:text-sm sm:text-base md:text-base">
                Enter job details like position, department, experience, skills, and description. Our platform tailors the analysis to your needs.
              </p>
            </div>
            <div className="bg-[#0a092b] p-2 xs:p-4 sm:p-6 rounded-lg shadow-md border border-[#347188]/30">
              <div className="text-blue-400 text-base xs:text-lg sm:text-2xl mb-1 xs:mb-2 sm:mb-4 font-bold">2</div>
              <h3 className="text-xs xs:text-sm sm:text-lg md:text-xl font-medium text-blue-200 mb-1 xs:mb-2 sm:mb-3">Upload Resumes</h3>
              <p className="text-blue-300 text-xs xs:text-sm sm:text-base md:text-base">
                Upload multiple resumes (PDF only) for instant AI-powered analysis and ranking.
              </p>
            </div>
            <div className="bg-[#0a092b] p-2 xs:p-4 sm:p-6 rounded-lg shadow-md border border-[#347188]/30">
              <div className="text-blue-400 text-base xs:text-lg sm:text-2xl mb-1 xs:mb-2 sm:mb-4 font-bold">3</div>
              <h3 className="text-xs xs:text-sm sm:text-lg md:text-xl font-medium text-blue-200 mb-1 xs:mb-2 sm:mb-3">AI-Powered Analysis</h3>
              <p className="text-blue-300 text-xs xs:text-sm sm:text-base md:text-base">
                Our OpenAI integration scores each resume based on your criteria, highlighting the most relevant candidates.
              </p>
            </div>
            <div className="bg-[#0a092b] p-2 xs:p-4 sm:p-6 rounded-lg shadow-md border border-[#347188]/30">
              <div className="text-blue-400 text-base xs:text-lg sm:text-2xl mb-1 xs:mb-2 sm:mb-4 font-bold">4</div>
              <h3 className="text-xs xs:text-sm sm:text-lg md:text-xl font-medium text-blue-200 mb-1 xs:mb-2 sm:mb-3">Get Shortlisted Candidates</h3>
              <p className="text-blue-300 text-xs xs:text-sm sm:text-base md:text-base">
                Instantly receive a ranked list of top candidates and download their resumes for review.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full mb-8 sm:mb-16">
          <h2 className="text-base xs:text-lg sm:text-2xl md:text-3xl font-semibold text-blue-200 mb-2 xs:mb-3 sm:mb-6">Why Choose Resume Tracker?</h2>
          <div className="space-y-2 xs:space-y-4 sm:space-y-8">
            <div className="bg-[#0a092b] p-2 xs:p-4 sm:p-6 rounded-lg shadow-md border border-[#347188]/30">
              <h3 className="text-xs xs:text-sm sm:text-lg md:text-xl font-medium text-blue-200 mb-1 xs:mb-2 sm:mb-3">Save Time & Resources</h3>
              <p className="text-blue-300 text-xs xs:text-sm sm:text-base md:text-base">
                Automate resume screening and focus on interviewing only the most qualified candidates.
              </p>
            </div>
            <div className="bg-[#0a092b] p-2 xs:p-4 sm:p-6 rounded-lg shadow-md border border-[#347188]/30">
              <h3 className="text-xs xs:text-sm sm:text-lg md:text-xl font-medium text-blue-200 mb-1 xs:mb-2 sm:mb-3">Objective Candidate Evaluation</h3>
              <p className="text-blue-300 text-xs xs:text-sm sm:text-base md:text-base">
                Our AI evaluates candidates based on your criteria, reducing bias and improving fairness.
              </p>
            </div>
            <div className="bg-[#0a092b] p-2 xs:p-4 sm:p-6 rounded-lg shadow-md border border-[#347188]/30">
              <h3 className="text-xs xs:text-sm sm:text-lg md:text-xl font-medium text-blue-200 mb-1 xs:mb-2 sm:mb-3">Comprehensive Analysis</h3>
              <p className="text-blue-300 text-xs xs:text-sm sm:text-base md:text-base">
                We analyze context, experience, skills, and overall fit—not just keywords.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full text-center bg-[#05041c] rounded-xl shadow-2xl shadow-[#347188]/20 border border-[#347188]/30 p-2 xs:p-4 sm:p-10">
          <h2 className="text-base xs:text-lg sm:text-2xl md:text-3xl font-semibold text-blue-200 mb-2 xs:mb-3 sm:mb-6">Ready to Transform Your Hiring Process?</h2>
          <p className="text-xs xs:text-sm sm:text-lg md:text-xl text-blue-300 mb-4 xs:mb-5 sm:mb-8">
            Join hundreds of recruiters who save time and find better candidates with Resume Tracker.
          </p>
          <div className="flex flex-col xs:flex-row justify-center gap-3 xs:gap-6">
            <Link href="/" className="w-full xs:w-auto px-4 xs:px-6 sm:px-8 py-2 xs:py-3 bg-[#0a092b] text-blue-400 font-bold rounded-lg hover:bg-[#347188] hover:text-white transition-all duration-300 shadow-md text-xs xs:text-sm sm:text-base">
              <span className="mr-2">←</span>Home
            </Link>
            <Link href="/dashboard" className="w-full xs:w-auto px-4 xs:px-6 sm:px-8 py-2 xs:py-3 bg-[#347188] text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-[#347188]/20 hover:shadow-xl hover:shadow-[#347188]/40 flex items-center justify-center gap-2 text-xs xs:text-sm sm:text-base">
              <span className="relative z-10">Get Started Now</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;