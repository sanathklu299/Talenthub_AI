import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const JobSearch = () => {
  const navigate = useNavigate();
  
  const generateJobs = () => {
    const titles = ['Frontend Developer', 'Backend Engineer', 'UI/UX Designer', 'DevOps Specialist', 'Product Manager', 'Data Analyst', 'Full Stack Developer', 'Marketing Director', 'Customer Support Lead', 'Mobile App Developer', 'Software Engineer', 'Systems Administrator', 'Machine Learning Engineer', 'Cloud Architect', 'QA Tester', 'Scrum Master', 'Business Analyst', 'Sales Executive', 'HR Coordinator', 'Content Writer'];
    const companies = ['Tech Corp', 'Data Systems', 'Creative Agency', 'CloudNet Inc.', 'Innovate LLC', 'QuantFin', 'Startup Hub', 'Growth Labs', 'ServicePro', 'AppWorks', 'NextGen', 'Enterprise Solutions', 'GlobalTech', 'Apex Software', 'Pioneer Digital', 'Synergy Corp', 'BlueSky IT', 'Vertex Solutions'];
    const locations = ['Remote', 'New York, NY', 'San Francisco, CA', 'Austin, TX', 'Chicago, IL', 'Los Angeles, CA', 'Seattle, WA', 'Boston, MA', 'Denver, CO', 'Miami, FL', 'Atlanta, GA'];
    const types = ['Full-time', 'Part-time', 'Contract', 'Internship'];
    const experiences = ['Internship', 'Entry-Level', 'Mid-Level', 'Senior', 'Director', 'Executive'];
    const baseSalaries = { 'Internship': 40, 'Entry-Level': 60, 'Mid-Level': 90, 'Senior': 130, 'Director': 160, 'Executive': 200 };

    return Array.from({ length: 50 }, (_, i) => {
      const exp = experiences[Math.floor(Math.random() * experiences.length)];
      const type = exp === 'Internship' ? 'Internship' : types[Math.floor(Math.random() * (types.length - 1))];
      const baseSal = baseSalaries[exp] + Math.floor(Math.random() * 20);
      return {
        id: i + 1,
        title: titles[Math.floor(Math.random() * titles.length)],
        company: companies[Math.floor(Math.random() * companies.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        salary: `$${baseSal}k - $${baseSal + 30}k`,
        type: type,
        experience: exp
      };
    });
  };

  const [jobs] = useState(generateJobs());
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [savedJobIds, setSavedJobIds] = useState([]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobIds(savedJobs.map(job => job.id));
  }, []);

  const handleToggleSave = (job) => {
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const isSaved = savedJobs.some(saved => saved.id === job.id);
    
    if (isSaved) {
      savedJobs = savedJobs.filter(saved => saved.id !== job.id);
      setSavedJobIds(savedJobIds.filter(id => id !== job.id));
      toast.success('Job removed from saved list');
    } else {
      savedJobs.push(job);
      setSavedJobIds([...savedJobIds, job.id]);
      toast.success('Job saved successfully!');
    }
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  };

  const uniqueLocations = useMemo(() => [...new Set(jobs.map(job => job.location))].sort(), [jobs]);
  const uniqueExperiences = useMemo(() => [...new Set(jobs.map(job => job.experience))], [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = locationFilter === '' || job.location === locationFilter;
      const matchesExperience = experienceFilter === '' || job.experience === experienceFilter;
      
      return matchesSearch && matchesLocation && matchesExperience;
    });
  }, [jobs, searchTerm, locationFilter, experienceFilter]);

  return (
    <div>
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Search Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input 
            type="text" 
            placeholder="Job title, keywords, company..." 
            className="md:col-span-2 rounded-md border-gray-300 shadow-sm p-3 border focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select 
            className="rounded-md border-gray-300 shadow-sm p-3 border focus:ring-blue-500 focus:border-blue-500 bg-white"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">All Locations</option>
            {uniqueLocations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          
          <select 
            className="rounded-md border-gray-300 shadow-sm p-3 border focus:ring-blue-500 focus:border-blue-500 bg-white"
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
          >
            <option value="">All Experience Levels</option>
            {uniqueExperiences.map(exp => (
              <option key={exp} value={exp}>{exp}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">Showing {filteredJobs.length} jobs</h3>
      </div>

      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-sm text-center">
            <p className="text-gray-500 text-lg">No jobs found matching your filters. Try adjusting your search criteria.</p>
          </div>
        ) : (
          filteredJobs.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                <p className="text-blue-600 font-semibold mt-1">{job.company}</p>
                <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600 font-medium">
                  <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center">📍 {job.location}</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center">💼 {job.type}</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center">💰 {job.salary}</span>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center">🎓 {job.experience}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleToggleSave(job)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    savedJobIds.includes(job.id)
                      ? 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200' 
                      : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                  }`}
                  title={savedJobIds.includes(job.id) ? "Unsave Job" : "Save Job"}
                >
                  {savedJobIds.includes(job.id) ? '★' : '☆'}
                </button>
                <button 
                  onClick={() => navigate(`/jobs/${job.id}`, { state: { job } })}
                  className="whitespace-nowrap text-white bg-blue-600 font-semibold hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors shadow-sm border-2 border-blue-600"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobSearch;
