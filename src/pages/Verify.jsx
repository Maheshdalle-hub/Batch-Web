import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("currentToken");

    if (!storedToken) {
      console.log("❌ No token found in localStorage!");
      setInvalidToken(true);
      return;
    }

    if (!token || token !== storedToken) {
      console.log("❌ Token not verified!");
      setInvalidToken(true);
      return;
    }

    // ✅ Store verification info
    const expirationTime = Date.now() + 2 * 24 * 60 * 60 * 1000;
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isVerified", "true");
    localStorage.setItem("verificationExpires", expirationTime);

    // ✅ Clear used token
    localStorage.removeItem("currentToken");

    setVerified(true);
    console.log("✅ Verification successful. Redirecting...");
    setTimeout(() => navigate("/subjects"), 2000);  
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