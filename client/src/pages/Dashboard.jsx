import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { Link } from "react-router-dom";

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

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not logged in.</p>;
  return (
    <div>
      <h1>Welcome, {user.displayName}</h1>
      <img src={user.avatarUrl} alt="avatar" width="80"></img>
      <p>@{user.username}</p>

      <Link to="/reports">View Past Reviews</Link>

      <ul>
        {repo.map((r) => (
          <li key={r.id}>
            <Link to={`/repo/${user.username}/${r.name}`}>{r.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
