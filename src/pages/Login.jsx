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
      const isCompleted = localStorage.getItem("shortenerCompleted") === "true";
      if (isCompleted) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/subjects");
        return;
      }

      let userToken = localStorage.getItem("userToken");
      if (!userToken) {
        userToken = generateUserToken();
        localStorage.setItem("userToken", userToken);
      }

      // ✅ Generate Shortener Link
      const link = await generateShortenedLink(userToken);
      if (link) {
        setShortenerLink(link);
        localStorage.setItem("shortenerLink", link);
      }

      // ✅ Check if shortener is completed
      const completed = await checkShortenerCompletion(userToken);
      if (completed) {
        localStorage.setItem("shortenerCompleted", "true");
        localStorage.setItem("isLoggedIn", "true");
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
        localStorage.setItem("isLoggedIn", "true");
        clearInterval(interval);
        navigate("/subjects");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="login-container">
      <h2>Login Required</h2>
      <p>© opyright se bachne ke liye tumhari 1 minute chahiye so click the button below 👇</p>

      {loading ? (
        <p>Generating your verification link...</p>
      ) : (
        shortenerLink && (
          <a href={shortenerLink} target="_blank" rel="noopener noreferrer" className="shortener-button">
            Start Verification ✅
          </a>
        )
      )}

      <p>After completing the verification, you will be automatically redirected.</p>
    </div>
  );
};

export default Login;