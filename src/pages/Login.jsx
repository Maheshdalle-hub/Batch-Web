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

      // ✅ Generate Shortener Link (Alias NOT stored)
      const link = await generateShortenedLink(userToken);
      if (link) {
        setShortenerLink(link);
      }

      // ✅ Check if shortener is completed
      const isCompleted = await checkShortenerCompletion(userToken);
      if (isCompleted) {
        navigate(`/verify/${userToken}`);
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
        clearInterval(interval);
        navigate(`/verify/${token}`);
      }
    }, 5000); // 🔄 Check every 5 seconds

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="login-container">
      <h2>Login Required</h2>
      <p>© opyright se bachne ke liye tumhari 1 minute chahiye so click the button below 👇</p>

      {loading ? (
        <p>Generating your link...</p>
      ) : (
        shortenerLink && (
          <a href={shortenerLink} target="_blank" rel="noopener noreferrer" className="shortener-button">
            Click Here ✅
          </a>
        )
      )}

      <p>After completing , you will be automatically redirected.</p>
    </div>
  );
};

export default Login;