import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { generateUserToken } from "../utils/tokenGenerator"; 
import { generateShortenedLink, checkShortenerCompletion } from "../utils/shortener"; 

const Login = () => {
  const [password, setPassword] = useState("");
  const [shortenerLink, setShortenerLink] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeLogin = async () => {
      let userToken = localStorage.getItem("userToken");
      if (!userToken) {
        userToken = generateUserToken();
      }

      // ✅ Generate Shortener Link
      const link = await generateShortenedLink(userToken);
      if (link) {
        setShortenerLink(link);
        localStorage.setItem("shortenerLink", link);
      }

      // ✅ Check if shortener is completed
      const isCompleted = await checkShortenerCompletion(userToken);
      if (isCompleted) {
        localStorage.setItem("shortenerCompleted", "true");
      }

      setLoading(false);
    };

    initializeLogin();
  }, []);

  useEffect(() => {
    // ✅ Auto-check every 5 seconds if shortener is completed
    const interval = setInterval(async () => {
      const token = localStorage.getItem("userToken");
      if (!token) return;

      const isCompleted = await checkShortenerCompletion(token);
      if (isCompleted) {
        localStorage.setItem("shortenerCompleted", "true");
        clearInterval(interval);
        navigate("/subjects");
      }
    }, 5000); // 🔄 Check every 5 seconds

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="login-container">
      <h2>🔑 Login Required</h2>

      {loading ? (
        <p>🔄 Checking shortener completion...</p>
      ) : (
        <>
          {shortenerLink && (
            <a href={shortenerLink} target="_blank" rel="noopener noreferrer" className="shortener-button">
              Complete Shortener ✅
            </a>
          )}

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button onClick={() => navigate("/subjects")} className="login-button">Login</button>
        </>
      )}
    </div>
  );
};

export default Login;
