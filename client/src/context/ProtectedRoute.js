import { useContext } from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { AppStates } from "./AppStates";

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AppStates);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

//   return <Outlet />;
};

export default ProtectedRoute;
