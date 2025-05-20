import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Login.css";
import { generateShortenedLink } from "../utils/shortener";

const Login = () => {
  const [shortenerLink, setShortenerLink] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isVerified = localStorage.getItem("isVerified") === "true";
    const expiresAt = localStorage.getItem("verificationExpires");

    // Redirect if user is already logged in and session is still valid
    if ((isLoggedIn && isVerified) && expiresAt && Date.now() < Number(expiresAt)) {
      const redirectPath = location.state?.redirectPath || "/subjects";
      navigate(redirectPath);
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
        setShortenerLink(verificationUrl);
      }

      setLoading(false);
    };

    initializeLogin();
  }, [navigate, location.state]);

  return (
    <div className="login-container">
      <h2>Login Required</h2>
      <p>Click the button below to verify your identity.</p>

      {loading ? (
        <p>Generating your link...</p>
      ) : (
        shortenerLink && (
          <a href={shortenerLink} className="shortener-button">
            Click Here ✅
          </a>
        )
      )}

      <p>After completing, you will be redirected.</p>
    </div>
  );
};

export default Login;
