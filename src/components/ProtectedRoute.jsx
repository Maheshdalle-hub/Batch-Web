import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isVerified = localStorage.getItem("isVerified") === "true";
  const expiresAt = localStorage.getItem("verificationExpires");

  // ✅ Validate session
  if (!isLoggedIn || !isVerified || !expiresAt || Date.now() > Number(expiresAt)) {
    console.log("❌ Session expired or invalid. Redirecting to login...");

    // ✅ Clear expired session
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isVerified");
    localStorage.removeItem("verificationToken");
    localStorage.removeItem("verificationExpires");

    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;