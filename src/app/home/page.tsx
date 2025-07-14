"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {

const [form, setForm] = useState({
    position: "",
    department: "",
    location: "",
    experience: "",
    openings: "",
    skills: "",
    description: "",
    salary: "",
  });
  // const [submitted, setSubmitted] = useState(false);
  // const [activeStep, setActiveStep] = useState(1);
  //From deepseek
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // setSubmitted(true);
  //   // Here you would send data to your backend
  //   //Save the data in the form of
  //   // {
  //   //   "position": "Data Scientist",
  //   //   "company": "Indeed",
  //   //   "experienceLevel": "entry",
  //   //   "openings": 1,
  //   //   "requiredSkills": ["Python", "Machine Learning", "Data Analysis", "SQL"]
  //   // }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Send form data to MongoDB via API route
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          requiredSkills: form.skills.split(',').map(skill => skill.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create job posting');
      }

      const { jobId } = await response.json();
      
      // Redirect to resume submission page with the job ID
      router.push(`/submitresume?jobId=${jobId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

 return (
  <div>
    {/* <div 
        className="fixed inset-0 z-0 bg-gray-900"
        style={{
          backgroundImage: `url(/createJob.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.1 // Adjust opacity as needed
        }}
      /> */}
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-500">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Resume Tracker - Create Job Posting</h1>
        
        {error && (
          <div className="text-red-600 mb-4 text-center font-semibold">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1 text-black">Job Position</label>
              <input
                type="text"
                name="position"
                value={form.position}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 text-black"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-black">Department</label>
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 text-black"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-black">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 text-black"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-black">Experience (in years)</label>
              <input
                type="text"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 text-black"
                placeholder="e.g. Entry, Mid, Senior"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-black">Number of Openings</label>
              <input
                type="number"
                name="openings"
                value={form.openings}
                onChange={handleChange}
                required
                min="1"
                className="w-full border rounded px-3 py-2 text-black"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-black">Required Skills</label>
              <input
                type="text"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 text-black"
                placeholder="Comma separated (e.g. React, Node.js)"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-black">Job Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 min-h-[80px] text-black"
                placeholder="Detailed description of the role, responsibilities and requirement..."
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-black">Salary Range</label>
              <input
                type="text"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 text-black"
                placeholder="e.g. $60,000 - $80,000"
              />
            </div>
            <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold mt-4 disabled:bg-blue-400"
          >
            {loading ? 'Creating...' : 'Create Job Posting'}
          </button>
        </form>
      </div>
    </main>
  </div>
    
  );
}