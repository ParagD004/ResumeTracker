import Head from 'next/head';
import Link from 'next/link';
import Footer from '@/components/Footer/page';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About Resume Tracker - AI-Powered Resume Screening</title>
        <meta name="description" content="Learn how Resume Tracker uses AI to streamline your recruitment process by analyzing and shortlisting the best resumes for your job openings." />
      </Head>

      <main className="container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Resume Tracker</h1>
          <p className="text-xl text-gray-600 mb-8">
            Revolutionizing recruitment with AI-powered resume analysis and shortlisting.
          </p>
          <div className="flex justify-center">
            <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
              Try It Now
            </Link>
          </div>
        </section>

        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">How Resume Tracker Works</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-2xl mb-4 font-bold">1</div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">Input Job Requirements</h3>
              <p className="text-gray-600">
                Recruiters provide key job details including position, department, location, experience level, required skills, job description, and salary range.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-2xl mb-4 font-bold">2</div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">Upload Multiple Resumes</h3>
              <p className="text-gray-600">
                Upload resumes in various formats (PDF, DOCX, etc.) from multiple candidates to be analyzed against your job requirements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-2xl mb-4 font-bold">3</div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">AI-Powered Analysis</h3>
              <p className="text-gray-600">
                Our advanced OpenAI integration analyzes each resume against your criteria, scoring candidates based on relevance and fit.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-2xl mb-4 font-bold">4</div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">Get Shortlisted Candidates</h3>
              <p className="text-gray-600">
                Receive a ranked list of the best candidates with their names and the option to download their resumes for further review.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Why Choose Resume Tracker?</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-800 mb-3">Save Time & Resources</h3>
              <p className="text-gray-600">
                Automate the initial screening process, reducing hours of manual resume review to minutes. Focus your time on interviewing only the most qualified candidates.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-800 mb-3">Objective Candidate Evaluation</h3>
              <p className="text-gray-600">
                Our AI evaluates candidates based solely on your specified criteria, eliminating unconscious bias in the initial screening phase.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-800 mb-3">Comprehensive Analysis</h3>
              <p className="text-gray-600">
                We analyze not just keywords but context, experience relevance, skill matching, and overall fit for your specific position requirements.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Ready to Transform Your Hiring Process?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of recruiters who save time and find better candidates with Resume Tracker.
          </p>
          <Link href="/dashboard" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300">
            Get Started Now
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;