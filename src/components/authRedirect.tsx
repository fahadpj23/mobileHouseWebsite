// components/AuthRedirect.tsx
import { useAppSelector } from "hooks/useRedux";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AuthRedirect = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user.auth);

  return isAuthenticated ? (
    <Navigate to="/admin/products" replace />
  ) : (
    <Outlet />
  );
};
