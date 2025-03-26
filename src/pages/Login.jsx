import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { generateShortenedLink } from "../utils/shortener";  // ✅ Removed unused import

const Login = () => {
  const [shortenerLink, setShortenerLink] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isVerified = localStorage.getItem("isVerified") === "true";
    const expiresAt = localStorage.getItem("verificationExpires");

    // ✅ Redirect if user is already logged in and session is still valid
    if ((isLoggedIn && isVerified) && expiresAt && Date.now() < Number(expiresAt)) {
      navigate("/subjects");
      return;
    }

    const initializeLogin = async () => {
      let verificationUrl = sessionStorage.getItem("currentVerificationUrl");

      if (!verificationUrl) {
        const newLink = await generateShortenedLink();
        if (newLink) {
          setShortenerLink(newLink);
          sessionStorage.setItem("currentVerificationUrl", newLink);
        }
      } else {
        // ✅ Use the existing link from session storage
        setShortenerLink(verificationUrl);
      }

      setLoading(false);
    };

    initializeLogin();
  }, [navigate]);

  return (
    <div className="login-container">
      <h2>Login Required</h2>
      <p>© Copyright se bachne ke liye tumhari 1 minute chahiye, so click the button below 👇</p>

      {loading ? (
        <p>Generating your link...</p>
      ) : (
        shortenerLink && (
          <a href={shortenerLink} className="shortener-button">
            Click Here ✅
          </a>
        )
      )}

      <p>After completing, you will be automatically redirected.</p>
    </div>
  );
};

export default Login;