// import { NavBar } from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="main-container">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export { Layout };
