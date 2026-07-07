import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
          withCredentials: true,
        });
        setUser(response.data.user);
        console.log("User set successfully:", response.data.user);
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
    </div>
  );
}

export default Dashboard;
