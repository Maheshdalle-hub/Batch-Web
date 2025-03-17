import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    // ✅ Get the list of used tokens
    let usedTokens = JSON.parse(localStorage.getItem("usedTokens")) || [];

    // ✅ Check if the token was already used
    if (usedTokens.includes(token)) {
      console.log("❌ Token already used! Redirecting to login...");
      navigate("/login");  // 🚨 Immediately reject and send to login
      return;
    }

    // ✅ Mark this token as used
    usedTokens.push(token);
    localStorage.setItem("usedTokens", JSON.stringify(usedTokens));

    // ✅ Set session expiry (2 days)
    const expirationTime = Date.now() + 2 * 24 * 60 * 60 * 1000;
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("verificationToken", token);
    localStorage.setItem("verificationExpires", expirationTime);

    navigate("/subjects");  // ✅ Redirect after storing verification
  }, [token, navigate]);

  return <p>✅ Verification successful! Redirecting...</p>;
};

export default Verify;