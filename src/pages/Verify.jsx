import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    // ✅ Retrieve used tokens from localStorage
    let usedTokens = JSON.parse(localStorage.getItem("usedTokens")) || [];

    // ✅ If token is already used, reject and send back to login
    if (usedTokens.includes(token)) {
      console.log("❌ Token already used! Redirecting to login...");
      navigate("/login");
      return;
    }

    // ✅ Store token as used immediately to prevent re-use
    usedTokens.push(token);
    localStorage.setItem("usedTokens", JSON.stringify(usedTokens));

    // ✅ Set expiration time (2 days from now)
    const expirationTime = Date.now() + 2 * 24 * 60 * 60 * 1000;
    
    // ✅ Save login status and expiry
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("verificationToken", token);
    localStorage.setItem("verificationExpires", expirationTime);

    navigate("/subjects"); // ✅ Redirect after storing data
  }, [token, navigate]);

  return <p>✅ Verification successful! Redirecting...</p>;
};

export default Verify;