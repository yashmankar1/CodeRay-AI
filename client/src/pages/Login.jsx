import { useState } from "react";

function Login() {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/github`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-slate-950 to-purple-950/40" />

      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left Side */}
            <div>
              <div className="mb-4 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
                AI-Powered Code Review Platform
              </div>

              <h1 className="mb-6 text-5xl font-bold leading-tight">
                Review GitHub Code
                <span className="block text-blue-500">
                  Using Artificial Intelligence
                </span>
              </h1>

              <p className="mb-8 text-lg text-slate-400">
                Connect your GitHub account, analyze repositories, detect bugs,
                improve code quality, and receive AI-generated suggestions in
                seconds.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  <span>Automated Code Quality Analysis</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  <span>Bug Detection & Best Practices</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  <span>AI-Powered Improvement Suggestions</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  <span>Repository Review History</span>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl shadow-2xl">
              <div className="text-center">
                <h2 className="mb-2 text-4xl font-bold">CodeRay AI</h2>

                <p className="mb-8 text-slate-400">
                  Sign in with GitHub to start reviewing your repositories
                </p>

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 font-semibold text-slate-900 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-900 border-t-transparent"></span>
                      Redirecting...
                    </>
                  ) : (
                    <>
                      <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.30 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .32.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      Continue with GitHub
                    </>
                  )}
                </button>

                <p className="mt-6 text-sm text-slate-500">
                  Secure GitHub OAuth authentication
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
