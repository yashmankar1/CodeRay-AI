import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

function ReviewPage() {
  const { owner, repo, "*": path } = useParams();

  const [code, setCode] = useState("");
  const [fileLoading, setFileLoading] = useState(true);

  const [review, setReview] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const url = `${API_BASE_URL}/api/repos/${owner}/${repo}/contents?path=${path}`;

        const response = await axios.get(url, { withCredentials: true });

        setCode(response.data.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setFileLoading(false);
      }
    };
    fetchFile();
  }, [owner, repo, path]);

  const handleReviewClick = async () => {
    setReviewLoading(true);
    try {
      const url = `${API_BASE_URL}/api/review`;

      const result = await axios.post(
        url,
        { owner, repo, path },
        { withCredentials: true },
      );
      setReview(result.data);
    } catch (err) {
      const message = err.response?.data?.error || err.message;
      setError(message);
    } finally {
      setReviewLoading(false);
    }
  };

  if (fileLoading) return <p>Loading file...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{path}</h1>

      <pre
        style={{ background: "#f4f4f4", padding: "1rem", overflowX: "auto" }}
      >
        <code>{code}</code>
      </pre>

      <button onClick={handleReviewClick} disabled={reviewLoading}>
        {reviewLoading ? "Analyzing..." : "Review with AI"}
      </button>

      {review && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Summary</h3>
          <p>{review.summary}</p>

          <h3>Quality Score: {review.qualityScore}/10</h3>

          <h3>Bugs</h3>
          {review.bugs.length === 0 ? (
            <p>No bugs found.</p>
          ) : (
            <ul>
              {review.bugs.map((bug, i) => (
                <li key={i}>{bug}</li>
              ))}
            </ul>
          )}

          <h3>Suggestions</h3>
          <ul>
            {review.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ReviewPage;
