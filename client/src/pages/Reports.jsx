import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";
import axios from "axios";

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const url = `${API_BASE_URL}/api/reports`;

        const results = await axios.get(url, { withCredentials: true });

        setReports(results.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/reports/${id}`, {
        withCredentials: true,
      });
      setReports(reports.filter((r) => r._id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <p className="text-lg font-medium text-gray-300">Loading reports...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-center text-4xl font-bold">
          Your Past Reviews
        </h1>

        {reports.length === 0 ? (
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center">
            <p className="text-gray-400">No reports found.</p>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {reports.map((report) => {
              return (
                <li
                  key={report._id}
                  className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-blue-500/10"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      {report.fileName}
                    </h3>

                    <span className="rounded-full bg-blue-600/20 px-3 py-1 text-sm font-medium text-blue-400">
                      {report.qualityScore}/10
                    </span>

                    <button
                      onClick={() => handleDelete(report._id)}
                      className="p-2 text-red-900 hover:text-red-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>

                  <p className="mb-3 text-sm text-gray-400">
                    <span className="font-medium text-gray-300">
                      Repository:
                    </span>{" "}
                    {report.repo}
                  </p>

                  <div className="rounded-lg bg-gray-800/50 p-4">
                    <p className="leading-relaxed text-gray-300">
                      {report.summary}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Reports;
