import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RepoBrowser from "./pages/RepoBrowser";
import ReviewPage from "./pages/ReviewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/repo/:owner/:repo/*" element={<RepoBrowser />} />
        <Route path="/review/:owner/:repo/*" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
