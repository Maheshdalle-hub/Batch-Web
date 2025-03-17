import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    // ✅ Get used tokens list from localStorage
    let usedTokens = JSON.parse(localStorage.getItem("usedTokens")) || [];

    // ✅ Check if this token was already used
    if (usedTokens.includes(token) || localStorage.getItem(`shortenerCompleted-${token}`) === "true") {
      console.log("❌ Token already used! Redirecting to login...");
      navigate("/login");
      return;
    }

    // ✅ Set token expiry (2 days from now)
    const expirationTime = Date.now() + 2 * 24 * 60 * 60 * 1000;

    // ✅ Mark this token as completed and store it in the used list
    usedTokens.push(token);
    localStorage.setItem("usedTokens", JSON.stringify(usedTokens));
    localStorage.setItem(`shortenerCompleted-${token}`, "true");

    // ✅ Store verification details
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("verificationToken", token);
    localStorage.setItem("verificationExpires", expirationTime);

    navigate("/subjects"); // ✅ Redirect after storing data
  }, [token, navigate]);

  return <p>✅ Hogaya successful! Redirecting...</p>;
};

export default Verify;