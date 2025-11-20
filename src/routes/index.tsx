import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense, type ReactNode } from "react";
import { useAuth } from "../context/authContext";

const Index = lazy(() => import("../pages/index"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/about"));
const Post = lazy(() => import("../pages/post"));
const MyPost = lazy(() => import("../pages/myPost"));
const Layout = lazy(() => import("../components/Layout"));

type RequireAuthType = { children: ReactNode; roles?: string[] };

const RequireAuth = ({ children, roles }: RequireAuthType) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.some((role) => user.roles?.includes(role))) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold mb-2">Access Denied!!!</h2>
        <p>You don't have permission to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* <Route path="/home" element={<Layout />}>
            <Route index element={<Home />}></Route>
          </Route> */}

          <Route
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="post" element={<Post />} />

            <Route
              path="my-post"
              element={
                <RequireAuth roles={["ADMIN", "AUTHOR"]}>
                  <MyPost />
                </RequireAuth>
              }
            />
          </Route>

          {/* <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />

          <Route
            path="/post"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<Post />} />
            <Route path="my-post" element={<MyPost />} />
          </Route> */}

          <Route path="/" element={<Index />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
