import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedAdmin = ({ children }) => {

  const token = localStorage.getItem("token");
  

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decoded = jwtDecode(token);

  if (decoded.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedAdmin;