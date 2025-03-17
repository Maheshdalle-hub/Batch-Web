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

    if (isLoggedIn && expiresAt && Date.now() < Number(expiresAt)) {
      navigate("/subjects");  // ✅ If still valid, go to subjects directly
      return;
    }

    // ✅ If expired or not verified, proceed with normal verification process
    const initializeLogin = async () => {
      // ✅ Get existing link if available
      let storedLink = localStorage.getItem("shortenerLink");
      let userToken = localStorage.getItem("userToken");

      if (!storedLink || !userToken) {
        // ✅ If no stored link or token, generate new one
        const newLink = await generateShortenedLink();
        if (newLink) {
          setShortenerLink(newLink);
          localStorage.setItem("shortenerLink", newLink);
        }
      } else {
        // ✅ If stored link exists, reuse it
        setShortenerLink(storedLink);
      }

      // ✅ Check if shortener is already completed
      const isCompleted = checkShortenerCompletion();
      if (isCompleted) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("verificationExpires", Date.now() + 2 * 24 * 60 * 60 * 1000);
        navigate("/subjects");
      }

      setLoading(false);
    };

    initializeLogin();
  }, [navigate]);

  // ✅ Auto-check every 5 seconds if shortener is completed
  useEffect(() => {
    const interval = setInterval(() => {
      const isCompleted = checkShortenerCompletion();
      if (isCompleted) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("verificationExpires", Date.now() + 2 * 24 * 60 * 60 * 1000);
        clearInterval(interval);
        navigate("/subjects");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="login-container">
      <h2>Login Required</h2>
      <p>© Opyright se bachne ke liye tumhari 1 minute chahiye so click the button below 👇</p>

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