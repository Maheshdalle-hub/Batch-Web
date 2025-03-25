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

    // ✅ Successful verification
    console.log("✅ Verification successful!");

    // ✅ Mark user as logged in
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isVerified", "true");

    navigate("/subjects");  // ✅ Redirect to content
  }, [token, navigate]);

  return <p>✅ Verification successful! Redirecting...</p>;
};

export default Verify;