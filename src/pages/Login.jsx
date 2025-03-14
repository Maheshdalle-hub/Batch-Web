import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { generateUserToken } from "../utils/tokenGenerator"; 
import { generateShortenedLink, checkShortenerCompletion } from "../utils/shortener"; 

const Login = () => {
  const [shortenerLink, setShortenerLink] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeLogin = async () => {
      let userToken = localStorage.getItem("userToken");
      if (!userToken) {
        userToken = generateUserToken();
        localStorage.setItem("userToken", userToken);
      }

      // ✅ Generate Shortener Link (but do NOT store the alias)
      const link = await generateShortenedLink(userToken);
      if (link) {
        setShortenerLink(link);  // Only store locally in state
      }

      // ✅ Check if shortener is completed
      const isCompleted = await checkShortenerCompletion(userToken);
      if (isCompleted) {
        localStorage.setItem("shortenerCompleted", "true");
        localStorage.setItem("isLoggedIn", "true");  // ✅ Set user as logged in
        navigate("/subjects");
      }

      setLoading(false);
    };

    initializeLogin();
  }, [navigate]);

  useEffect(() => {
    // ✅ Auto-check every 5 seconds if shortener is completed
    const interval = setInterval(async () => {
      const token = localStorage.getItem("userToken");
      if (!token) return;

      const isCompleted = await checkShortenerCompletion(token);
      if (isCompleted) {
        localStorage.setItem("shortenerCompleted", "true");
        localStorage.setItem("isLoggedIn", "true"); // ✅ Mark user as logged in
        clearInterval(interval);
        navigate("/subjects");
      }
    }, 5000); // 🔄 Check every 5 seconds

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="login-container">
      <h2>Login Required</h2>
      <p>© opyright se bachne ke liye tumhari 1 minute chahiye so click the button below 👇</p>

      {loading ? (
        <p className="loading-text">Generating your link...</p>
      ) : (
        shortenerLink && (
          <a href={shortenerLink} target="_blank" rel="noopener noreferrer" className="shortener-button">
            Click Here ✅
          </a>
        )
      )}

      <p>After completing the verification, you will be automatically redirected.</p>
    </div>
  );
};

export default Login;
