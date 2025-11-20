import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getMyDetails, login } from "../services/auth";
import { useAuth } from "../context/authContext";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { user, setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Handle Login");

    if (!email || !password) {
      setMessage("⚠️ Please fill in all fields");
      return;
    }

    try {
      const data = await login(email, password);

      const authData = data.data;

      console.log(authData);
      console.log(authData?.accessToken);

      if (authData?.accessToken) {
        localStorage.setItem("accessToken", authData?.accessToken);
        localStorage.setItem("refreshToken", authData?.refreshToken);

        const resData = await getMyDetails();
        setUser(resData.data);
        console.log(user);
        navigate("/home");
      } else {
        setMessage("Failed to Sign In? Try Again!!!");
      }
    } catch (error) {
      console.error(error);
    }

    setMessage("");
  };

  // function athenticate() {
  //   return axios.post(
  //     "http://localhost:5000/api/v1/auth/login",
  //     {
  //       email,
  //       password,
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  // }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {message && (
          <p className="text-red-600 text-sm mb-4  font-medium">{message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-amber-950 transition-colors"
        >
          Sign In
        </button>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
