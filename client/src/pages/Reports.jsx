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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Your Past Reviews</h1>
      <ul>
        {reports.map((report) => {
          return (
            <li key={report._id}>
              <h3>{report.fileName}</h3>
              <p>Repo: {report.repo}</p>
              <p>Score: {report.qualityScore}/10</p>
              <p>{report.summary}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Reports;
