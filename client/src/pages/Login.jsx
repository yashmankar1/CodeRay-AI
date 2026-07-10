function Login() {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/github`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center px-8 py-12 bg-slate-800 rounded-2xl shadow-xl max-w-md w-full mx-4">
        <h1 className="text-4xl font-bold text-white mb-2">CodeRay AI</h1>
        <p className="text-slate-400 mb-8">
          AI-powered code review for your GitHub repositories
        </p>
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white text-slate-900 font-semibold py-3 px-6 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.30 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .32.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Login with GitHub
        </button>
      </div>
    </div>
  );
}

export default Login;
