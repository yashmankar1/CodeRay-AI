import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import Header from "./Header";

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
      <Header user={user} />

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
              className="block bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-blue-500 hover:bg-slate-800/80 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{r.name}</h3>

                  <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                    {r.description || "No description available"}
                  </p>
                </div>

                {r.language && (
                  <span className="shrink-0 text-xs font-medium text-blue-300 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                    {r.language}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
