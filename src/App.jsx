
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Shortlist from "./pages/Shortlist";
import Logs from "./pages/Logs";

// Placeholder components for routes
function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900">Welcome to AutoTrader</h1>
      <p className="text-gray-600 mt-2">Your automated trading dashboard</p>
    </div>
  );
}

function Profile() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
      <p className="text-gray-600 mt-2">Manage your account settings</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shortlist" element={<Shortlist />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}