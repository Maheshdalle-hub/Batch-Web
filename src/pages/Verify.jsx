import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    // ✅ Get used tokens list from localStorage
    let usedTokens = JSON.parse(localStorage.getItem("usedTokens")) || [];

    // ✅ Check if the token is already used
    if (usedTokens.includes(token)) {
      console.log("❌ Token already used! Redirecting to login...");
      navigate("/login");
      return;
    }

    // ✅ Mark token as used
    usedTokens.push(token);
    localStorage.setItem("usedTokens", JSON.stringify(usedTokens));

    // ✅ Store verification details
    const expirationTime = Date.now() + 2 * 24 * 60 * 60 * 1000; // 2 days validity
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("verificationToken", token);
    localStorage.setItem("verificationExpires", expirationTime);

    navigate("/subjects"); // ✅ Redirect after storing data
  }, [token, navigate]);

  return <p>✅ Verification successful! Redirecting...</p>;
};

export default Verify;