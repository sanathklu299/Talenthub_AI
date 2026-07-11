import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
        Find Your Dream Job Today
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl">
        Connect with top employers and discover opportunities that match your skills. Join TalentHub and take the next step in your career.
      </p>
      <div className="flex space-x-4">
        <Link to="/jobs" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
          Browse Jobs
        </Link>
        <Link to="/register" className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
          Post a Job
        </Link>
      </div>
    </div>
  );
};

export default Home;
