import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../src/context/AuthContext";

const PublicRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  // If user is logged in, redirect to dashboard
  return token ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;