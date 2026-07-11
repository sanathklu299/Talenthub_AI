import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SeekerProfile = () => {
  const navigate = useNavigate();
  // Using dummy data since we are just mocking the specific seeker view for now
  // In a real application, you would fetch this by the ID in the URL useParams()
  const seeker = {
    name: "Alice Smith",
    email: "alice.smith@example.com",
    role: "Frontend Developer",
    location: "San Francisco, CA",
    experience: "Mid-Level",
    about: "Passionate Frontend Developer with 4 years of experience building scalable and responsive web applications using React and Tailwind CSS. I enjoy solving complex problems and collaborating with cross-functional teams to deliver high-quality products.",
    skills: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "Git"],
    experienceList: [
      { id: 1, title: "Frontend Developer", company: "Tech Solutions Inc.", period: "2021 - Present", desc: "Developed and maintained user-facing features using React.js. Improved performance by 30% through code optimization." },
      { id: 2, title: "Junior Web Developer", company: "Creative Web Agency", period: "2019 - 2021", desc: "Collaborated with designers to translate wireframes into interactive prototypes. Built responsive landing pages." }
    ],
    education: "B.S. in Computer Science, University of California (2019)"
  };

  const handleAction = (action) => {
    toast.success(`Candidate has been ${action}!`);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-blue-600 mb-6 font-medium flex items-center transition-colors">
        ← Back to Dashboard
      </button>

      {/* Profile Header */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center space-x-0 md:space-x-8 mb-8 text-center md:text-left">
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 text-5xl shadow-inner mb-4 md:mb-0">
          {seeker.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-gray-900">{seeker.name}</h1>
          <p className="text-xl text-blue-600 font-semibold mt-1">{seeker.role}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4 text-sm font-medium text-gray-600">
            <span className="bg-gray-100 px-3 py-1 rounded-full">📍 {seeker.location}</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">✉️ {seeker.email}</span>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">🎓 {seeker.experience}</span>
          </div>
        </div>
        <div className="mt-6 md:mt-0 flex flex-col gap-3 w-full md:w-auto">
          <button 
            onClick={() => handleAction('Shortlisted for Interview')}
            className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm w-full"
          >
            Schedule Interview
          </button>
          <button 
            onClick={() => handleAction('Rejected')}
            className="bg-white border-2 border-red-500 text-red-500 font-bold px-6 py-3 rounded-lg hover:bg-red-50 transition-colors shadow-sm w-full"
          >
            Reject Candidate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed">{seeker.about}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Work Experience</h2>
            <div className="space-y-6">
              {seeker.experienceList.map(exp => (
                <div key={exp.id} className="border-l-2 border-blue-500 pl-4">
                  <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                  <p className="text-blue-600 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                  <p className="text-gray-700">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Top Skills</h2>
            <div className="flex flex-wrap gap-2">
              {seeker.skills.map(skill => (
                <span key={skill} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
            <p className="text-gray-700 font-medium">{seeker.education}</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Attachments</h2>
            <a href="#" className="flex items-center gap-2 text-blue-600 font-semibold hover:underline bg-blue-50 p-3 rounded-lg">
              📄 View Resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerProfile;
