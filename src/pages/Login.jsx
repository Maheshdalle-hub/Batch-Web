import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { generateShortenedLink, checkShortenerCompletion } from "../utils/shortener"; 

const Login = () => {
  const [shortenerLink, setShortenerLink] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const expiresAt = localStorage.getItem("verificationExpires");

    // ✅ Redirect if session is still valid
    if (isLoggedIn && expiresAt && Date.now() < Number(expiresAt)) {
      navigate("/subjects");
      return;
    }

    const initializeLogin = async () => {
      // ✅ Check if there's an existing unfinished shortener link
      const storedLink = localStorage.getItem("shortenerLink");
      const storedToken = localStorage.getItem("verificationToken");

      if (storedLink && storedToken) {
        // ✅ Use the existing link if not completed
        console.log("🔗 Reusing existing shortened link...");
        setShortenerLink(storedLink);
      } else {
        // ✅ Generate a new link and token if none exist
        console.log("🆕 Generating new link...");
        const token = Math.random().toString(36).substr(2, 10);
        localStorage.setItem("verificationToken", token);

        const newLink = await generateShortenedLink(token);

        if (newLink) {
          localStorage.setItem("shortenerLink", newLink);
          setShortenerLink(newLink);
        }
      }

      setLoading(false);
    };

    initializeLogin();
  }, [navigate]);

  // ✅ Auto-check every 5 seconds for shortener completion
  useEffect(() => {
    const interval = setInterval(() => {
      const isCompleted = checkShortenerCompletion();

      if (isCompleted) {
        const currentToken = localStorage.getItem("verificationToken");

        // ✅ Clear the shortener link after completion
        localStorage.removeItem("shortenerLink");

        // ✅ Redirect to verification page
        navigate(`/verify/${currentToken}`);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="login-container">
      <h2>Login Required</h2>
      <p>Click the button below and complete the step to verify. 👇</p>

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