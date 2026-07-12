import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

function Header({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isOnReportsPage = location.pathname === "/reports";

  const handleLogout = async () => {
    await axios.post(
      `${API_BASE_URL}/api/auth/logout`,
      {},
      { withCredentials: true },
    );
    navigate("/");
  };

  return (
    <header className="border-b border-slate-800 px-8 py-4 flex items-center justify-between bg-slate-900">
      <Link to="/dashboard" className="text-xl font-bold hover:text-slate-300">
        CodeRay AI
      </Link>

      <div className="flex items-center gap-6">
        {!isOnReportsPage && (
          <Link
            to="/reports"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Past Reviews
          </Link>
        )}

        {user && (
          <div className="flex items-center gap-3">
            <img
              src={user.avatarUrl}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-slate-300">@{user.username}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
