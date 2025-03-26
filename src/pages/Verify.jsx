import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [verified, setVerified] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);

  // ✅ Extract token from query parameter
  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("currentToken");

    if (!token || token !== storedToken) {
      console.log("❌ Token not verified!");
      setInvalidToken(true);
      return;
    }

    // ✅ Token is valid → Verify user
    const expirationTime = Date.now() + 2 * 24 * 60 * 60 * 1000;  // 2 days expiry
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isVerified", "true");
    localStorage.setItem("verificationExpires", expirationTime);

    // ✅ Remove the used token from both storages
    localStorage.removeItem("verificationToken");
    sessionStorage.removeItem("currentToken");

    setVerified(true);
    console.log("✅ Verification successful. Redirecting...");
    setTimeout(() => navigate("/subjects"), 2000);  // Redirect after 2 seconds
  }, [token, navigate]);

  return (
    <div>
      {verified ? (
        <p>✅ Verification successful! Redirecting...</p>
      ) : invalidToken ? (
        <p>❌ Token not verified! Please complete the shortener again.</p>
      ) : (
        <p>🔄 Verifying...</p>
      )}
    </div>
  );
};

export default Verify;