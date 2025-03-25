import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // ✅ Get the current token and expiration
    const storedToken = localStorage.getItem("verificationToken");
    const expiresAt = localStorage.getItem("verificationExpires");

    // 🚫 Prevent reuse of old tokens
    if (!storedToken || token !== storedToken || Date.now() > Number(expiresAt)) {
      console.log("❌ Invalid or expired token. Redirecting to login...");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("verificationToken");
      localStorage.removeItem("verificationExpires");
      navigate("/login");
      return;
    }

    // ✅ Successful verification (first-time use)
    console.log("✅ Verification successful!");
    localStorage.setItem("isLoggedIn", "true");
    
    // ✅ Remove token after successful verification (one-time use)
    localStorage.removeItem("verificationToken");

    navigate("/subjects");  // ✅ Redirect after successful verification
  }, [token, navigate]);

  return <p>✅ Verification successful! Redirecting...</p>;
};

export default Verify;