import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Shortlist from "../pages/Shortlist";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/shortlist" element={<Shortlist />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
