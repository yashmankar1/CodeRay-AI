import { API_BASE_URL } from "../config/api";

function Login() {
  const handleLogin = () => {
    window.location.href = `${API_BASE_URL}/api/auth/github`;
  };
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>CodeRay AI</h1>
      <p>AI-powered code review for your GitHub repositories</p>
      <button onClick={handleLogin}>Login with Github</button>
    </div>
  );
}

export default Login;
