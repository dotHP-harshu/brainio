import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function ProtectedRoutes() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Context missing</div>;
  }

  if (userContext.loading) {
    return <div>Checking authentication...</div>;
  }

  if (!userContext.user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
