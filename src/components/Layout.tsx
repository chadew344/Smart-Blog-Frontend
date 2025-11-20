import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Layout = () => {
  const { user, setUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex justify-center gap-6 py-4 bg-gray-100 shadow">
        <Link to="/home" className="hover:underline">
          Home
        </Link>
        <Link to="/about" className="hover:underline">
          About
        </Link>
        <Link to="/post" className="hover:underline">
          Posts
        </Link>
        {user?.roles?.includes("ADMIN") ||
          (user?.roles?.includes("AUTHOR") && (
            <Link to="/my-post" className="hover:underline">
              My Posts
            </Link>
          ))}
      </nav>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <footer className="text-center py-4 text-sm text-gray-500 border-t">
        © 2025 Smart Blog. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
