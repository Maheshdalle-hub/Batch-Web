import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.log("❌ No token found. Redirecting to login...");
      navigate("/login");
      return;
    }

    const storedToken = localStorage.getItem("verificationToken");
    const expiresAt = localStorage.getItem("verificationExpires");

    // ✅ Validate token and expiration
    if (!storedToken || token !== storedToken || Date.now() > Number(expiresAt)) {
      console.log("❌ Invalid or expired token. Redirecting...");
      
      // ✅ Clear expired session
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isVerified");
      localStorage.removeItem("verificationToken");
      localStorage.removeItem("verificationExpires");
      localStorage.removeItem("shortenerLink");  // ✅ Clear old shortener link

      navigate("/login");
      return;
    }

    // ✅ Store verification status and session time
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isVerified", "true");

    console.log("✅ Verification successful!");

    // ✅ Redirect with a delay to ensure `localStorage` is properly saved
    setTimeout(() => {
      navigate("/subjects");
    }, 100);  // ✅ Short delay to ensure localStorage is saved properly

  }, [token, navigate]);

  return <p>✅ Verification successful! Redirecting...</p>;
};

export default Verify;