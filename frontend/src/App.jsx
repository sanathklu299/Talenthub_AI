import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobSearch from './pages/JobSearch';
import Dashboard from './pages/Dashboard';
import JobDetails from './pages/JobDetails';
import SeekerProfile from './pages/SeekerProfile';
import PostJob from './pages/PostJob';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<JobSearch />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/seeker/:id" element={<SeekerProfile />} />
            <Route path="/post-job" element={<PostJob />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
