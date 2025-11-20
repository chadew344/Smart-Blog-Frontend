// import { useAuth } from "../context/authContext";

// export default function Home() {
//   const { user, setUser } = useAuth();

//   return (
//     <div>
//       <div className="flex items-center justify-center bg-gray-100">
//         <h1 className="text-3xl font-semibold text-gray-800">Home Page</h1>
//       </div>
//       {user ? (
//         <>
//           <p>Email: {user.email}</p>
//           <p>Role: {user.roles}</p>
//         </>
//       ) : (
//         <p>No user data found</p>
//       )}
//     </div>
//   );
// }

import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h1 className="text-4xl font-bold mb-4">
        Welcome, {user?.email || "User"}!
      </h1>
      <p className="mb-6 text-gray-700">
        You are now logged in. This is your Home page.
      </p>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
