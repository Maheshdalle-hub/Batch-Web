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
    // ✅ Check if user is already verified and the token is still valid
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const expiresAt = localStorage.getItem("verificationExpires");

    if (isLoggedIn && expiresAt && Date.now() < Number(expiresAt)) {
      navigate("/subjects");  // ✅ If still valid, go to subjects directly
      return;
    }

    // ✅ If expired or not verified, proceed with normal verification process
    const initializeLogin = async () => {
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
      const isCompleted = await checkShortenerCompletion(userToken);
      if (isCompleted) {
        const expirationTime = Date.now() + 2 * 24 * 60 * 60 * 1000; // ✅ 2 days from now

        localStorage.setItem("shortenerCompleted", "true");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("verificationExpires", expirationTime);
        navigate("/subjects");
      }

      setLoading(false);
    };

    initializeLogin();
  }, [navigate]);

  // ✅ Auto-check every 5 seconds if shortener is completed
  useEffect(() => {
    const interval = setInterval(async () => {
      const token = localStorage.getItem("userToken");
      if (!token) return;

      const isCompleted = await checkShortenerCompletion(token);
      if (isCompleted) {
        const expirationTime = Date.now() + 2 * 24 * 60 * 60 * 1000; // ✅ 2 days from now

        localStorage.setItem("shortenerCompleted", "true");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("verificationExpires", expirationTime);
        
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
        <p>Generating your link...</p>
      ) : (
        shortenerLink && (
         <a href={shortenerLink} className="shortener-button">
  Click Here ✅
</a>
        )
      )}

      <p>After completing , you will be automatically redirected.</p>
    </div>
  );
};

export default Login;