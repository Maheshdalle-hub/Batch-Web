import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();  // ✅ Get the token from the URL
  const navigate = useNavigate();
  const location = useLocation();
  
  const [verified, setVerified] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUrl = sessionStorage.getItem("currentVerificationUrl");

    // ✅ Get the full current URL being accessed
    const currentUrl = `${window.location.origin}${location.pathname}`;

    if (!storedUrl || currentUrl !== storedUrl) {
      console.log("❌ Token not verified!");
      setInvalidToken(true);
      setLoading(false);
      return;
    }

    // ✅ Token is valid → Verify the user
    const expirationTime = Date.now() + 2 * 24 * 60 * 60 * 1000;  // 2 days expiry
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isVerified", "true");
    localStorage.setItem("verificationExpires", expirationTime);

    // ✅ Remove the used verification URL
    sessionStorage.removeItem("currentVerificationUrl");

    setVerified(true);
    setLoading(false);
    console.log("✅ Verification successful. Redirecting...");
    setTimeout(() => navigate("/subjects"), 2000);  // Redirect after 2 seconds
  }, [navigate, location]);

  return (
    <div>
      {loading ? (
        <p>🔄 Verifying...</p>
      ) : verified ? (
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