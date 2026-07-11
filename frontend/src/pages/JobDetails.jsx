import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const JobDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    resumeLink: '',
    coverLetter: ''
  });

  const job = state?.job;

  useEffect(() => {
    if (job) {
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      setIsSaved(savedJobs.some(saved => saved.id === job.id));
    }
  }, [job]);

  if (!job) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold">Job not found</h2>
        <button onClick={() => navigate('/jobs')} className="mt-4 text-blue-600 underline">Back to Jobs</button>
      </div>
    );
  }

  const handleSaveJob = () => {
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    if (isSaved) {
      savedJobs = savedJobs.filter(saved => saved.id !== job.id);
      setIsSaved(false);
      toast.success('Job removed from saved list');
    } else {
      savedJobs.push(job);
      setIsSaved(true);
      toast.success('Job saved successfully!');
    }
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setShowApplyModal(false);
    
    // Save application to localStorage so it shows on the Dashboard
    const currentApplications = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    const newApplication = {
      id: Date.now(),
      jobId: job.id,
      title: job.title,
      company: job.company,
      status: 'Under Review',
      date: new Date().toLocaleDateString()
    };
    localStorage.setItem('appliedJobs', JSON.stringify([...currentApplications, newApplication]));
    
    toast.success(`Successfully applied to ${job.title} at ${job.company}!`);
    navigate('/jobs');
  };

  const handleInputChange = (e) => {
    setApplicationData({ ...applicationData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-6 relative">
      <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-blue-600 mb-6 font-medium flex items-center transition-colors">
        ← Back to Search
      </button>

      <div className="border-b border-gray-100 pb-8 mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{job.title}</h1>
        <p className="text-2xl text-blue-600 font-semibold mb-6">{job.company}</p>
        
        <div className="flex flex-wrap gap-4 text-sm font-medium">
          <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full flex items-center">📍 {job.location}</span>
          <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full flex items-center">💼 {job.type}</span>
          <span className="bg-green-50 text-green-700 px-4 py-2 rounded-full flex items-center">💰 {job.salary}</span>
          <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full flex items-center">🎓 {job.experience}</span>
        </div>
      </div>

      <div className="prose max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
        <p className="mb-6 leading-relaxed">
          We are looking for a highly skilled and motivated <strong>{job.title}</strong> to join our team at <strong>{job.company}</strong>. 
          In this role, you will be responsible for building cutting-edge solutions, collaborating with cross-functional teams, and driving impactful results in a fast-paced environment.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Key Responsibilities</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Design, develop, and maintain high-quality software applications.</li>
          <li>Collaborate with product managers and designers to define project requirements.</li>
          <li>Ensure the best possible performance, quality, and responsiveness of applications.</li>
          <li>Identify bottlenecks and bugs, and devise solutions to mitigate these issues.</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Requirements</h3>
        <ul className="list-disc pl-5 mb-8 space-y-2">
          <li>Proven experience working as a {job.title} or similar role.</li>
          <li>Experience level required: {job.experience}.</li>
          <li>Strong problem-solving skills and ability to work independently.</li>
          <li>Excellent communication and teamwork skills.</li>
        </ul>
      </div>

      <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col md:flex-row gap-4 justify-center">
        <button 
          onClick={() => setShowApplyModal(true)}
          className="bg-blue-600 text-white text-lg font-bold hover:bg-blue-700 px-12 py-4 rounded-xl transition-all shadow-md hover:shadow-lg w-full md:w-auto"
        >
          Apply Now
        </button>
        <button 
          onClick={handleSaveJob}
          className={`text-lg font-bold px-12 py-4 rounded-xl transition-all shadow-sm border-2 w-full md:w-auto flex items-center justify-center gap-2
            ${isSaved 
              ? 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200' 
              : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
            }`}
        >
          <span>{isSaved ? '★ Saved' : '☆ Save Job'}</span>
        </button>
      </div>

      {/* Application Modal Overlay */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={() => setShowApplyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-2">Apply for {job.title}</h2>
            <p className="text-gray-600 mb-6">at {job.company}</p>
            
            <form onSubmit={handleApplySubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" name="firstName" value={applicationData.firstName} onChange={handleInputChange} required className="w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" name="lastName" value={applicationData.lastName} onChange={handleInputChange} required className="w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" name="phone" value={applicationData.phone} onChange={handleInputChange} required className="w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio / Resume Link</label>
                <input type="url" name="resumeLink" value={applicationData.resumeLink} onChange={handleInputChange} required placeholder="https://..." className="w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter (Optional)</label>
                <textarea name="coverLetter" value={applicationData.coverLetter} onChange={handleInputChange} rows="4" className="w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" placeholder="Why are you a good fit?"></textarea>
              </div>
              
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setShowApplyModal(false)} className="flex-1 bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 py-3 rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-blue-600 text-white font-bold hover:bg-blue-700 py-3 rounded-lg transition-colors shadow-sm">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
