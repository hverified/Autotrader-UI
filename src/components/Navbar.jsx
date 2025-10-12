// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import { Home, List, User, FileText, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
  };

  return (
    <>
      {/* Top Navbar for Desktop */}
      <nav className="hidden sm:block bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-3">
            <NavLink to="/" className="flex items-center gap-2">
              <svg width="30px" height="30px" viewBox="0 -0.5 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#1E3A8A" }} />
                    <stop offset="50%" style={{ stopColor: "#3B82F6" }} />
                    <stop offset="100%" style={{ stopColor: "#60A5FA" }} />
                  </linearGradient>
                </defs>
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(1.000000, 0.000000)" fill="url(#blueGradient)">
                    <path d="M0,14.977 C0,15.514 0.275,15.951 0.615,15.951 L14.385,15.951 C14.725,15.951 15,15.514 15,14.977 L15,14.977 C15,14.438 14.725,14.001 14.385,14.001 L0.615,14.001 C0.275,14.001 0,14.438 0,14.977 L0,14.977 L0,14.977 Z"></path>
                    <path d="M11.053,12.258 C11.053,12.635 11.418,12.944 11.869,12.944 L13.092,12.944 C13.543,12.944 13.907,12.635 13.907,12.258 L13.907,8.818 C13.907,8.44 13.543,8.132 13.092,8.132 L11.869,8.132 C11.418,8.132 11.053,8.44 11.053,8.818 L11.053,12.258 L11.053,12.258 Z"></path>
                    <path d="M6.089,12.259 C6.089,12.637 6.454,12.944 6.904,12.944 L8.128,12.944 C8.578,12.944 8.943,12.637 8.943,12.259 L8.943,7.779 C8.943,7.401 8.578,7.094 8.128,7.094 L6.904,7.094 C6.454,7.094 6.089,7.401 6.089,7.779 L6.089,12.259 L6.089,12.259 Z"></path>
                    <path d="M1.062,12.232 C1.062,12.607 1.429,12.912 1.886,12.912 L3.122,12.912 C3.578,12.912 3.946,12.607 3.946,12.232 L3.946,5.727 C3.946,5.352 3.578,5.047 3.122,5.047 L1.886,5.047 C1.429,5.047 1.062,5.352 1.062,5.727 L1.062,12.232 L1.062,12.232 Z"></path>
                    <path d="M14.266,6.921 C14.645,6.92 14.957,6.624 14.971,6.248 C14.985,5.863 14.68,5.542 14.289,5.529 C9.285,5.352 4.521,3.424 1.215,0.236 C0.936,-0.032 0.49,-0.029 0.214,0.248 C-0.058,0.522 -0.053,0.965 0.226,1.233 C3.832,4.71 8.809,6.73 14.24,6.92 C14.249,6.921 14.258,6.921 14.266,6.921 L14.266,6.921 Z"></path>
                  </g>
                </g>
              </svg>
              <span className="text-xl font-bold text-gray-900">AutoTrader</span>
            </NavLink>

            {/* Desktop Navigation Links */}
            <div className="flex items-center gap-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                <Home size={18} />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/shortlist"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                <List size={18} />
                <span>Watchlist</span>
              </NavLink>
              <NavLink
                to="/logs"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                <FileText size={18} />
                <span>Logs</span>
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                <User size={18} />
                <span>Profile</span>
              </NavLink>

              {/* User Info & Logout */}
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
                <span className="text-sm text-gray-600">
                  {user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center gap-2"
                  title="Logout"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navbar for Mobile */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
        <div className="grid grid-cols-5 py-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs py-1 transition-colors ${isActive ? "text-blue-600" : "text-gray-500"
              }`
            }
          >
            <Home size={22} />
            <span className="mt-1">Home</span>
          </NavLink>
          <NavLink
            to="/shortlist"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs py-1 transition-colors ${isActive ? "text-blue-600" : "text-gray-500"
              }`
            }
          >
            <List size={22} />
            <span className="mt-1">Watchlist</span>
          </NavLink>
          <NavLink
            to="/logs"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs py-1 transition-colors ${isActive ? "text-blue-600" : "text-gray-500"
              }`
            }
          >
            <FileText size={22} />
            <span className="mt-1">Logs</span>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs py-1 transition-colors ${isActive ? "text-blue-600" : "text-gray-500"
              }`
            }
          >
            <User size={22} />
            <span className="mt-1">Profile</span>
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex flex-col items-center text-xs py-1 text-red-500 transition-colors"
          >
            <LogOut size={22} />
            <span className="mt-1">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
}