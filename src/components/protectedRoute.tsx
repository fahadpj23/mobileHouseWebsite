import { useAppSelector } from "hooks/useRedux";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user.auth);
  const location = useLocation();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
