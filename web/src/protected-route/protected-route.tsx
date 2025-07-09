import { Navigate, Outlet } from "react-router";
import { useAuth } from "./auth-context";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
