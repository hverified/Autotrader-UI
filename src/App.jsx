import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Shortlist from "./pages/Shortlist";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Shortlist />} />
        </Routes>
      </div>
    </Router>
  );
}
