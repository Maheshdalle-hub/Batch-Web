import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");  // "loading", "success", "error"

  useEffect(() => {
    // ✅ Get the current full URL (including path)
    const currentUrl = window.location.href;
    const storedUrl = sessionStorage.getItem("currentVerificationUrl");

    if (!storedUrl || currentUrl !== storedUrl) {
      console.log("❌ Token not verified! URLs don't match.");
      setStatus("error");
      return;
    }

    // ✅ URLs match → Verify the user
    const expirationTime = Date.now() + 2 * 24 * 60 * 60 * 1000;  // 2 days expiry
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isVerified", "true");
    localStorage.setItem("verificationExpires", expirationTime);

    // ✅ Clear stored verification URL after successful login
    sessionStorage.removeItem("currentVerificationUrl");

    console.log("✅ Verification successful. Redirecting...");
    setStatus("success");

    // ✅ Redirect after 2 seconds
    setTimeout(() => navigate("/subjects"), 2000);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", padding: "50px", fontSize: "18px" }}>
      {status === "loading" && <p>🔄 Verifying... Please wait...</p>}
      {status === "success" && <p>✅ Verification successful! Redirecting...</p>}
      {status === "error" && <p>❌ Token not verified! Please complete the shortener again.</p>}
    </div>
  );
};

export default Verify;