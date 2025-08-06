'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DataEnterPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    position: '',
    department: '',
    location: '',
    experience: '',
    openings: 1, // Default to 1 instead of 0
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
    setErrorMsg("");
    // Validate required fields
    if (
      !formData.position.trim() ||
      !formData.department.trim() ||
      !formData.location.trim() ||
      !formData.experience.trim() ||
      !formData.skills.trim() ||
      !formData.description.trim() ||
      formData.openings < 1
    ) {
      setErrorMsg("All fields are required. Please fill out every field before submitting.");
      return;
    }
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

      const result = await response.json();
      const jobId = result.data?._id || result.jobId;

      router.push(`/submitresume?jobId=${jobId}`);
    } catch (error) {
      console.error('Error submitting job posting:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // A consistent style for all form inputs
  const inputStyle = "w-full bg-slate-800 border border-slate-600 text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-[#347188] focus:border-[#347188] transition-all duration-300 placeholder:text-gray-500";


  return (
    <div className="max-w-2xl mx-auto p-8 my-10 bg-[#05041c] rounded-xl shadow-2xl shadow-[#347188]/20 border border-[#347188]/30">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-100 pb-4 border-b border-[#347188]/50">
          Create New Job Posting
        </h1>
        <p className="text-gray-400 mt-2">Fill in the details below to open a new position.</p>
        {errorMsg && (
          <div className="mt-4 text-red-400 font-semibold text-base animate-pulse">{errorMsg}</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Position */}
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-400 mb-2">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className={inputStyle}
            placeholder="e.g., Senior Frontend Developer"
          />
        </div>

        {/* Department & Location (Side-by-side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-400 mb-2">
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className={inputStyle}
                placeholder="e.g., Development"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-400 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className={inputStyle}
                placeholder="e.g., Pimpri-Chinchwad, Remote"
              />
            </div>
        </div>

        {/* Experience & Openings (Side-by-side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-400 mb-2">
                Experience Required
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className={inputStyle}
                placeholder="e.g., 5+ Years"
              />
            </div>
             <div>
              <label htmlFor="openings" className="block text-sm font-medium text-gray-400 mb-2">
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
                className={inputStyle}
              />
            </div>
        </div>
        
        {/* Skills */}
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-400 mb-2">
            Required Skills (comma-separated)
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            className={inputStyle}
            placeholder="e.g., React, TypeScript, Next.js, Tailwind CSS"
          />
        </div>
        
        {/* Salary */}
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-400 mb-2">
            Salary Range
          </label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            className={inputStyle}
            placeholder="e.g., $120,000 - $150,000 per year"
          />
        </div>

        {/* Job Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-2">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            className={inputStyle}
            placeholder="Describe the roles, responsibilities, and requirements for this position."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-[#347188] text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-[#347188]/20 hover:shadow-xl hover:shadow-[#347188]/40 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="relative z-10">{isSubmitting ? 'Submitting...' : 'Create & Proceed'}</span>
              {!isSubmitting && <span className="transform group-hover:translate-x-1 transition-transform">→</span>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}





// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function DataEnterPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     position: '',
//     department: '',
//     location: '',
//     experience: '',
//     openings: 0,
//     skills: '',
//     description: '',
//     salary: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'openings' ? parseInt(value) || 0 : value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await fetch('/api/jobpostings', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit job posting');
//       }

//       // Get jobId from response
//       const result = await response.json();
//       const jobId = result.data?._id || result.jobId; // adjust based on your API response

//       // router.push('/submitresume');
//       router.push(`/submitresume?jobId=${jobId}`);
//     } catch (error) {
//       console.error('Error submitting job posting:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-[#05041c] rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold mb-6">Create New Job Posting</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="position" className="block text-sm font-medium text-gray-700">
//             Position
//           </label>
//           <input
//             type="text"
//             id="position"
//             name="position"
//             value={formData.position}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
//           />
//         </div>

//         <div>
//           <label htmlFor="department" className="block text-sm font-medium text-gray-700">
//             Department
//           </label>
//           <input
//             type="text"
//             id="department"
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
//           />
//         </div>

//         <div>
//           <label htmlFor="location" className="block text-sm font-medium text-gray-700">
//             Location
//           </label>
//           <input
//             type="text"
//             id="location"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
//           />
//         </div>

//         <div>
//           <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
//             Experience Required
//           </label>
//           <input
//             type="text"
//             id="experience"
//             name="experience"
//             value={formData.experience}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
//           />
//         </div>

//         <div>
//           <label htmlFor="openings" className="block text-sm font-medium text-gray-700">
//             Number of Openings
//           </label>
//           <input
//             type="number"
//             id="openings"
//             name="openings"
//             value={formData.openings}
//             onChange={handleChange}
//             required
//             min="1"
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
//           />
//         </div>

//         <div>
//           <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
//             Required Skills
//           </label>
//           <input
//             type="text"
//             id="skills"
//             name="skills"
//             value={formData.skills}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
//           />
//         </div>

//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//             Job Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             rows={4}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
//           />
//         </div>

//         <div>
//           <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
//             Salary Range
//           </label>
//           <input
//             type="text"
//             id="salary"
//             name="salary"
//             value={formData.salary}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
//           />
//         </div>

//         <div>
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="px-6 py-2 bg-[#347188] text-white rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-green-500/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <span className="relative z-10">{isSubmitting ? 'Submitting...' : 'Submit Job Posting'}</span>
//               <span className="text-blue-200">→</span>
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }




