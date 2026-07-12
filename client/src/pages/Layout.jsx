import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
