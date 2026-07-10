import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [repo, setRepo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
          withCredentials: true,
        });
        setUser(response.data.user);

        const repos = await axios.get(`${API_BASE_URL}/api/repos`, {
          withCredentials: true,
        });
        setRepo(repos.data);
      } catch (error) {
        console.error("Not logged in:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-300">
        Loading...
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-300">
        Not logged in.
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-slate-800 px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">CodeRay AI</h1>
        <nav className="flex items-center gap-6">
          <Link
            to="/reports"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Past Reviews
          </Link>
          <div className="flex items-center gap-3">
            <img
              src={user.avatarUrl}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-slate-300">@{user.username}</span>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-10">
        <h2 className="text-2xl font-semibold mb-1">
          Welcome, {user.displayName}
        </h2>
        <p className="text-slate-400 mb-8">
          Select a repository to browse and review its code.
        </p>

        <div className="grid gap-3">
          {repo.map((r) => (
            <Link
              key={r.id}
              to={`/repo/${user.username}/${r.name}`}
              className="block bg-slate-800 border border-slate-700 rounded-lg px-5 py-4 hover:border-slate-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{r.name}</span>
                {r.language && (
                  <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">
                    {r.language}
                  </span>
                )}
              </div>
              {r.description && (
                <p className="text-sm text-slate-400 mt-1">{r.description}</p>
              )}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
