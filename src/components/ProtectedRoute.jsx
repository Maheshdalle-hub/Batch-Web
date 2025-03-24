import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isVerified = localStorage.getItem("isVerified") === "true";  // ✅ Check verification flag
  const expiresAt = localStorage.getItem("verificationExpires");

  // ✅ Check if expired or missing
  if (!isLoggedIn || !isVerified || !expiresAt || Date.now() > Number(expiresAt)) {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isVerified");  // ✅ Clear verification flag
    localStorage.removeItem("verificationToken");
    localStorage.removeItem("verificationExpires");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;