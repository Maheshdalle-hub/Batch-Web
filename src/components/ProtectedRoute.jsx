import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const expiresAt = localStorage.getItem("verificationExpires");

  // ✅ Check if verification expired
  if (!isLoggedIn || !expiresAt || Date.now() > expiresAt) {
    localStorage.removeItem("isLoggedIn"); // ❌ Remove expired session
    localStorage.removeItem("verificationToken");
    localStorage.removeItem("verificationExpires");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;