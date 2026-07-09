import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import { useNavigate } from "react-router-dom";

function RepoBrowser() {
  const { owner, repo, "*": path } = useParams();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
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
  }, [owner, repo, path]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{repo}</h1>
      <ul>
        {contents.map((item) => (
          <li key={item.sha}>
            {item.type === "dir" ? (
              <Link to={`/repo/${owner}/${repo}/${item.path}`}>
                📁 {item.name}
              </Link>
            ) : (
              <span
                onClick={() =>
                  navigate(`/review/${owner}/${repo}/${item.path}`)
                }
              >
                📄 {item.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepoBrowser;
