import { useEffect } from "react";
import { useAuth } from "../context/authContext";

const About = () => {
  // const { user, setUser } = useAuth();
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-center py-8 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-semibold text-gray-800">About Page</h1>
      </div>

      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          User Details
        </h2>

        <div className="space-y-2 text-gray-600">
          <p>
            <span className="font-medium">First Name:</span> {user?.firstName}
          </p>
          <p>
            <span className="font-medium">Last Name:</span> {user?.lastName}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-medium">Role:</span> {user?.roles}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
