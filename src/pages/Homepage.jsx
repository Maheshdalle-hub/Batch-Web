import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import imageUrl from "./IMG_20250227_100103_636.jpg";  
import mlogo from "../assets/ntmlogo.jpg";

const Homepage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login"); // ✅ Redirects to login page on click
  };

  return (
    <div className="container">
      {/* ✅ Big Logo */}
      <img src={mlogo} alt="Logo" className="big-logo" />

      <div className="click-box" onClick={handleClick}>
        <img src={imageUrl} alt="Aarambh Batch 2025-26" className="homepage-image" />
        <h1>Aarambh Batch 2025-26</h1>
      </div>
    </div>
  );
};

export default Homepage;
