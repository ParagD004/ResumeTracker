'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DataEnterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    position: '',
    department: '',
    location: '',
    experience: '',
    openings: 0,
    skills: '',
    description: '',
    salary: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'openings' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/jobpostings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit job posting');
      }

      // Get jobId from response
      const result = await response.json();
      const jobId = result.data?._id || result.jobId; // adjust based on your API response

      // router.push('/submitresume');
      router.push(`/submitresume?jobId=${jobId}`);
    } catch (error) {
      console.error('Error submitting job posting:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Job Posting</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
            Experience Required
          </label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        <div>
          <label htmlFor="openings" className="block text-sm font-medium text-gray-700">
            Number of Openings
          </label>
          <input
            type="number"
            id="openings"
            name="openings"
            value={formData.openings}
            onChange={handleChange}
            required
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
            Required Skills
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
            Salary Range
          </label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Job Posting'}
          </button>
        </div>
      </form>
    </div>
  );
}



















// "use client"
// import { useState } from "react";
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import axios from "axios";

// export default function DataEnter() {

// const [form, setForm] = useState({
//     position: "",
//     department: "",
//     location: "",
//     experience: "",
//     openings: "",
//     skills: "",
//     description: "",
//     salary: "",
//   });
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {

//   //      const response = await axios.post('/api/jobs', {
//   //   ...form,
//   //   requiredSkills: form.skills.split(',').map(skill => skill.trim()) || [],
//   // }, {
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //   },
//   // });

//   // if (response.status !== 201) {
//   //   throw new Error('Failed to create job posting');
//   // }

//   // const { jobId } = response.data;
  
//   // // Redirect to resume submission page with the job ID
//   // router.push(`/submitresume?jobId=${jobId}`);

//       // // Send form data to MongoDB via API route
//       const response = await fetch('/api/resumes', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...form,
//           requiredSkills: form.skills.split(',').map(skill => skill.trim()),
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create job posting');
//       }

//       const { jobId } = await response.json();
      
//       // Redirect to resume submission page with the job ID
//       router.push(`/submitresume?jobId=${jobId}`);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//       setLoading(false);
//     }
//   };

//  return (
//   <div>
//     <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-500">
//       <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8">
//         <h1 className="text-3xl font-bold mb-6 text-center text-black">Resume Tracker - Create Job Posting</h1>
        
//         {error && (
//           <div className="text-red-600 mb-4 text-center font-semibold">{error}</div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block font-medium mb-1 text-black">Job Position</label>
//               <input
//                 type="text"
//                 name="position"
//                 value={form.position}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded px-3 py-2 text-black"
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1 text-black">Department</label>
//               <input
//                 type="text"
//                 name="department"
//                 value={form.department}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded px-3 py-2 text-black"
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1 text-black">Location</label>
//               <input
//                 type="text"
//                 name="location"
//                 value={form.location}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded px-3 py-2 text-black"
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1 text-black">Experience (in years)</label>
//               <input
//                 type="text"
//                 name="experience"
//                 value={form.experience}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded px-3 py-2 text-black"
//                 placeholder="e.g. Entry, Mid, Senior"
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1 text-black">Number of Openings</label>
//               <input
//                 type="number"
//                 name="openings"
//                 value={form.openings}
//                 onChange={handleChange}
//                 required
//                 min="1"
//                 className="w-full border rounded px-3 py-2 text-black"
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1 text-black">Required Skills</label>
//               <input
//                 type="text"
//                 name="skills"
//                 value={form.skills}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded px-3 py-2 text-black"
//                 placeholder="Comma separated (e.g. React, Node.js)"
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1 text-black">Job Description</label>
//               <textarea
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded px-3 py-2 min-h-[80px] text-black"
//                 placeholder="Detailed description of the role, responsibilities and requirement..."
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1 text-black">Salary Range</label>
//               <input
//                 type="text"
//                 name="salary"
//                 value={form.salary}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded px-3 py-2 text-black"
//                 placeholder="e.g. $60,000 - $80,000"
//               />
//             </div>
//             <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold mt-4 disabled:bg-blue-400"
//           >
//             {loading ? 'Creating...' : 'Create Job Posting'}
//           </button>
//         </form>
//       </div>
//     </main>
//   </div>
    
//   );
// }