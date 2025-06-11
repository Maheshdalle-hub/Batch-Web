import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [verifyLink, setVerifyLink] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isVerified = localStorage.getItem("isVerified") === "true";

    // Redirect if already logged in (no expiration check now)
    if (isLoggedIn && isVerified) {
      const redirectPath = location.state?.redirectPath || "/subjects";
      navigate(redirectPath);
      return;
    }

    const initializeLogin = () => {
      // If token not present, generate and store a new one
      let currentToken = localStorage.getItem("currentToken");
      if (!currentToken) {
        currentToken = Math.random().toString(36).substring(2, 10);
        localStorage.setItem("currentToken", currentToken);
      }

      const url = `https://batch-web.vercel.app/verify/${currentToken}`;
      setVerifyLink(url);
      setLoading(false);
    };

    initializeLogin();
  }, [navigate, location.state]);

  return (
    <div className="login-container">
      <h2>Login removed</h2>
      <p>Click the button below to verify your identity. Directly open ho jayega.</p>

      {loading ? (
        <p>Generating your link...</p>
      ) : (
        verifyLink && (
          <a href={verifyLink} className="shortener-button">
            Click Here ✅
          </a>
        )
      )}

      <p>After clikcing, you will be diretly redirected.</p>
    </div>
  );
};

export default Login;
