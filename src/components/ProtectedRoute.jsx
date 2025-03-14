import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const expiresAt = localStorage.getItem("verificationExpires");

  // ✅ If expired or missing, force re-login
  if (!isLoggedIn || !expiresAt || Date.now() > Number(expiresAt)) {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("verificationToken");
    localStorage.removeItem("verificationExpires");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;