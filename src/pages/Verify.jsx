import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const verifyToken = () => {
      // ✅ Use sessionStorage instead of localStorage
      let usedTokens = JSON.parse(sessionStorage.getItem("usedTokens")) || [];

      if (usedTokens.includes(token)) {
        console.log("❌ Token already used! Redirecting to login...");
        navigate("/login");
        return;
      }

      // ✅ Add the token to usedTokens
      usedTokens.push(token);
      sessionStorage.setItem("usedTokens", JSON.stringify(usedTokens));

      // ✅ Store session values
      const expirationTime = Date.now() + 2 * 24 * 60 * 60 * 1000;  // 2 days expiry
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("isVerified", "true");
      sessionStorage.setItem("verificationToken", token);
      sessionStorage.setItem("verificationExpires", expirationTime.toString());

      console.log("✅ Verification successful. Redirecting...");

      // ✅ Slight delay to ensure proper storage
      setTimeout(() => {
        navigate("/subjects");
      }, 100);
    };

    verifyToken();
  }, [token, navigate]);

  return <p>✅ Verification successful! Redirecting...</p>;
};

export default Verify;