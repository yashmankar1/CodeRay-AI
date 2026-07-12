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

        const response = await axios.get(url, {
          withCredentials: true,
        });

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
    setReview(null);
    setError(null);

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

  if (fileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <p className="text-lg text-gray-300">Loading file...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="break-all text-3xl font-bold text-white">{path}</h1>
        <p className="mt-2 text-gray-400">
          Repository: {owner}/{repo}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-lg">
        <div className="border-b border-gray-800 px-4 py-3">
          <h2 className="font-medium text-gray-300">Source Code</h2>
        </div>

        <pre className="overflow-x-auto p-6 text-sm text-gray-300">
          <code>{code}</code>
        </pre>
      </div>

      <div className="mt-6">
        <button
          onClick={handleReviewClick}
          disabled={reviewLoading}
          className="flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {reviewLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Analyzing...
            </>
          ) : (
            "Review with AI"
          )}
        </button>
      </div>

      {reviewLoading && (
        <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

          <h2 className="text-xl font-semibold text-blue-400">
            AI Review in Progress
          </h2>

          <p className="mt-3 text-gray-400">
            Analyzing code quality, searching for bugs, reviewing best
            practices, and generating improvement suggestions...
          </p>
        </div>
      )}

      {review && !reviewLoading && (
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-3 text-xl font-semibold">Summary</h2>
            <p className="leading-relaxed text-gray-300">{review.summary}</p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-3 text-xl font-semibold">Quality Score</h2>

            <div className="inline-flex rounded-full bg-green-500/20 px-4 py-2 text-lg font-bold text-green-400">
              {review.qualityScore}/10
            </div>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-semibold">Bugs Found</h2>

            {review.bugs.length === 0 ? (
              <p className="text-green-400">✅ No bugs found.</p>
            ) : (
              <ul className="space-y-3">
                {review.bugs.map((bug, i) => (
                  <li
                    key={i}
                    className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-red-300"
                  >
                    {bug}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Improvement Suggestions
            </h2>

            <ul className="space-y-3">
              {review.suggestions.map((suggestion, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-3 text-blue-300"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewPage;
