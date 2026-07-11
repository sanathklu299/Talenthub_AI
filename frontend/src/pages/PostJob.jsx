import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PostJob = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: '',
    location: '',
    type: 'Full-time',
    experience: 'Mid-Level',
    salaryMin: '',
    salaryMax: '',
    description: '',
    requirements: ''
  });

  const handleInputChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a fully connected app, you would send this to POST /api/jobs
    // For now, we simulate success and return to the dashboard
    toast.success('Job posted successfully! It is now live on the platform.');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-blue-600 mb-6 font-medium flex items-center transition-colors">
        ← Back to Dashboard
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Post a New Job</h1>
        <p className="text-gray-500 mb-8">Fill out the details below to publish a new open position for your company.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Job Title</label>
              <input 
                type="text" 
                name="title" 
                value={jobData.title} 
                onChange={handleInputChange} 
                required 
                placeholder="e.g. Senior React Developer"
                className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
              <input 
                type="text" 
                name="location" 
                value={jobData.location} 
                onChange={handleInputChange} 
                required 
                placeholder="e.g. Remote, San Francisco, CA"
                className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Job Type</label>
              <select 
                name="type" 
                value={jobData.type} 
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Experience Level</label>
              <select 
                name="experience" 
                value={jobData.experience} 
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="Internship">Internship</option>
                <option value="Entry-Level">Entry-Level</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior">Senior</option>
                <option value="Director">Director</option>
                <option value="Executive">Executive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Minimum Salary ($)</label>
              <input 
                type="number" 
                name="salaryMin" 
                value={jobData.salaryMin} 
                onChange={handleInputChange} 
                required 
                placeholder="e.g. 80000"
                className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Maximum Salary ($)</label>
              <input 
                type="number" 
                name="salaryMax" 
                value={jobData.salaryMax} 
                onChange={handleInputChange} 
                required 
                placeholder="e.g. 120000"
                className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Job Description</label>
            <textarea 
              name="description" 
              value={jobData.description} 
              onChange={handleInputChange} 
              required 
              rows="5"
              placeholder="Describe the responsibilities and day-to-day tasks..."
              className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Requirements & Qualifications</label>
            <textarea 
              name="requirements" 
              value={jobData.requirements} 
              onChange={handleInputChange} 
              required 
              rows="4"
              placeholder="List the required skills, degrees, or certifications..."
              className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div className="pt-6 border-t border-gray-100 flex gap-4">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="px-8 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm py-3"
            >
              Publish Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
