import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    // ✅ Retrieve the list of used tokens
    let usedTokens = JSON.parse(localStorage.getItem("usedTokens")) || [];

    // ✅ Check for duplicate usage
    if (usedTokens.includes(token)) {
      console.log("❌ Token already used! Redirecting to login...");
      navigate("/login");  // 🚨 Redirect to login if reused
      return;
    }

    // ✅ Add the token to the used list
    usedTokens.push(token);
    localStorage.setItem("usedTokens", JSON.stringify(usedTokens));

    // ✅ Store verification flag and expiration
    const expirationTime = Date.now() + 2 * 24 * 60 * 60 * 1000;  // 2 days expiry
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isVerified", "true");  // ✅ Add verification flag
    localStorage.setItem("verificationToken", token);
    localStorage.setItem("verificationExpires", expirationTime);

    console.log("✅ Verification successful. Redirecting...");
    navigate("/subjects");  // ✅ Redirect to content
  }, [token, navigate]);

  return <p>✅ Verification successful! Redirecting...</p>;
};

export default Verify;