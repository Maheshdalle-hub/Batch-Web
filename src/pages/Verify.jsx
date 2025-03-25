import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const verifyToken = async () => {
      let usedTokens = JSON.parse(localStorage.getItem("usedTokens")) || [];

      if (usedTokens.includes(token)) {
        console.log("❌ Token already used! Redirecting to login...");
        navigate("/login");
        return;
      }

      // ✅ Store token and verification flag properly
      usedTokens.push(token);
      localStorage.setItem("usedTokens", JSON.stringify(usedTokens));

      const expirationTime = Date.now() + 2 * 24 * 60 * 60 * 1000;  // 2 days expiry

      // ✅ Use `await` to ensure localStorage writes are completed
      await Promise.resolve().then(() => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isVerified", "true");
        localStorage.setItem("verificationToken", token);
        localStorage.setItem("verificationExpires", expirationTime);
      });

      console.log("✅ Verification successful. Redirecting...");
      
      // ✅ Delay redirection slightly to ensure data is saved
      setTimeout(() => {
        navigate("/subjects");
      }, 100);  // Small delay to ensure localStorage is written
    };

    verifyToken();
  }, [token, navigate]);

  return <p>✅ Verification successful! Redirecting...</p>;
};

export default Verify;