import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RepoBrowser from "./pages/RepoBrowser";
import ReviewPage from "./pages/ReviewPage";
import Reports from "./pages/Reports";
import Layout from "./pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route element={<Layout />}>
          <Route path="/reports" element={<Reports />} />
          <Route path="/repo/:owner/:repo/*" element={<RepoBrowser />} />
          <Route path="/review/:owner/:repo/*" element={<ReviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
