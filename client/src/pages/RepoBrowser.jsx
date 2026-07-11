import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function RepoBrowser() {
  const { owner, repo, "*": path } = useParams();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const url = path
          ? `${API_BASE_URL}/api/repos/${owner}/${repo}/contents?path=${path}`
          : `${API_BASE_URL}/api/repos/${owner}/${repo}/contents`;

        const response = await axios.get(url, { withCredentials: true });
        setContents(response.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContents();

    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/reports/stats/${owner}/${repo}`,
          { withCredentials: true },
        );
        setStats(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchStats();
  }, [owner, repo, path]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-300">
        Loading...
      </div>
    );

  const pathParts = path ? path.split("/") : [];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-slate-800 px-8 py-4 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="text-xl font-bold hover:text-slate-300"
        >
          CodeRay AI
        </Link>
        <Link
          to="/reports"
          className="text-slate-300 hover:text-white transition-colors"
        >
          Past Reviews
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-10">
        <div className="flex items-center gap-1 text-sm text-slate-400 mb-6 flex-wrap">
          <Link
            to={`/repo/${owner}/${repo}`}
            className="hover:text-white transition-colors"
          >
            {repo}
          </Link>
          {pathParts.map((part, i) => {
            const linkPath = pathParts.slice(0, i + 1).join("/");
            return (
              <span key={i} className="flex items-center gap-1">
                <span className="text-slate-600">/</span>
                <Link
                  to={`/repo/${owner}/${repo}/${linkPath}`}
                  className="hover:text-white transition-colors"
                >
                  {part}
                </Link>
              </span>
            );
          })}
        </div>

        {!path && stats && stats.totalFiles > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-400 mb-3">
              Your Review Activity
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3">
                <p className="text-2xl font-bold">{stats.totalFiles}</p>
                <p className="text-xs text-slate-400">Files Reviewed</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3">
                <p className="text-2xl font-bold">{stats.avgQualityScore}/10</p>
                <p className="text-xs text-slate-400">Avg Quality Score</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3">
                <p className="text-2xl font-bold">{stats.totalBugs}</p>
                <p className="text-xs text-slate-400">Bugs Found</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3">
                <p className="text-2xl font-bold">{stats.totalSuggestions}</p>
                <p className="text-xs text-slate-400">Suggestions</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-slate-800 border border-slate-700 rounded-lg divide-y divide-slate-700 overflow-hidden">
          {contents.map((item) => (
            <div
              key={item.sha}
              className="px-5 py-3 hover:bg-slate-750 transition-colors"
            >
              {item.type === "dir" ? (
                <Link
                  to={`/repo/${owner}/${repo}/${item.path}`}
                  className="flex items-center gap-3 text-slate-200 hover:text-white"
                >
                  <span>📁</span>
                  <span>{item.name}</span>
                </Link>
              ) : (
                <button
                  onClick={() =>
                    navigate(`/review/${owner}/${repo}/${item.path}`)
                  }
                  className="flex items-center gap-3 text-slate-300 hover:text-white w-full text-left"
                >
                  <span>📄</span>
                  <span>{item.name}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default RepoBrowser;
