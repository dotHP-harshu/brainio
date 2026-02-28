import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function ProtectedRoutes() {
  const { user, loading } = useUser()

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
