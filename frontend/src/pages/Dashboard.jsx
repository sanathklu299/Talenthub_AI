import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [savedJobsCount, setSavedJobsCount] = useState(0);
  const [savedJobsList, setSavedJobsList] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
    
    // Load seeker applications and saved jobs
    const savedApplications = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    setApplications(savedApplications);
    
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobsCount(savedJobs.length);
    setSavedJobsList(savedJobs);
  }, [navigate]);

  if (!user) return null;

  // EMPLOYER VIEW
  if (user.role === 'employer') {
    return (
      <div className="max-w-6xl mx-auto mt-8">
        {/* Employer Header */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'E'}
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">{user.fullName}</h2>
            <p className="text-gray-500 text-lg">{user.email}</p>
            <span className="mt-2 inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full capitalize">
              Employer Account
            </span>
          </div>
          <div className="ml-auto">
            <button 
              onClick={() => navigate('/post-job')}
              className="bg-blue-600 text-white font-bold hover:bg-blue-700 px-6 py-3 rounded-lg shadow-sm transition-colors"
            >
              + Post New Job
            </button>
          </div>
        </div>

        {/* Employer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider">Active Listings</h3>
            <p className="text-4xl font-extrabold text-gray-900 mt-2">3</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider">Total Applicants</h3>
            <p className="text-4xl font-extrabold text-gray-900 mt-2">14</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider">Interviews Scheduled</h3>
            <p className="text-4xl font-extrabold text-gray-900 mt-2">2</p>
          </div>
        </div>

        {/* Recent Applicants */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Recent Applicants</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { id: 1, name: 'Alice Smith', role: 'Frontend Developer', status: 'Pending Review', resume: '#' },
              { id: 2, name: 'Mark Johnson', role: 'Backend Engineer', status: 'Interviewing', resume: '#' },
              { id: 3, name: 'Sarah Lee', role: 'UI/UX Designer', status: 'Pending Review', resume: '#' },
            ].map(applicant => (
              <div key={applicant.id} className="p-6 hover:bg-gray-50 transition-colors flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                    {applicant.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{applicant.name}</h3>
                    <p className="text-gray-600">Applied for: <span className="font-semibold">{applicant.role}</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                    applicant.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {applicant.status}
                  </span>
                  <button 
                    onClick={() => navigate(`/seeker/${applicant.id}`)}
                    className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    View Seeker Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // JOB SEEKER VIEW (Default)
  return (
    <div className="max-w-5xl mx-auto mt-8">
      {/* Profile Header */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-6 mb-8">
        <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">{user.fullName}</h2>
          <p className="text-gray-500 text-lg">{user.email}</p>
          <span className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full capitalize">
            {user.role} Account
          </span>
        </div>
      </div>
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider">Jobs Applied</h3>
          <p className="text-4xl font-extrabold text-gray-900 mt-2">{applications.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider">Saved Jobs</h3>
          <p className="text-4xl font-extrabold text-gray-900 mt-2">{savedJobsCount}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider">Profile Views</h3>
          <p className="text-4xl font-extrabold text-gray-900 mt-2">0</p>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">My Applications</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {applications.length === 0 ? (
            <div className="p-10 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No Applications Yet</h3>
              <p className="text-gray-500">You haven't applied to any jobs yet. Start exploring opportunities!</p>
              <button 
                onClick={() => navigate('/jobs')}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                Browse Jobs
              </button>
            </div>
          ) : (
            applications.map(app => (
              <div key={app.id} className="p-6 hover:bg-gray-50 transition-colors flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{app.title}</h3>
                  <p className="text-gray-600">{app.company} • Applied on {app.date}</p>
                </div>
                <div>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                    app.status === 'Applied' ? 'bg-blue-100 text-blue-700' :
                    app.status === 'Under Review' ? 'bg-yellow-100 text-yellow-700' :
                    app.status === 'Interview Scheduled' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Saved Jobs List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">My Saved Jobs</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {savedJobsList.length === 0 ? (
            <div className="p-10 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No Saved Jobs</h3>
              <p className="text-gray-500">You haven't saved any jobs yet. Bookmark jobs you like to find them here later!</p>
            </div>
          ) : (
            savedJobsList.map(job => (
              <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                  <p className="text-gray-600">{job.company} • {job.location}</p>
                </div>
                <div>
                  <button 
                    onClick={() => navigate(`/jobs/${job.id}`, { state: { job } })}
                    className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    View Job
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
