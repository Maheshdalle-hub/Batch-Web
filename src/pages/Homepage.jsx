import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const Homepage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container">
      <div className="click-box" onClick={() => navigate("/subjects")}>
        <img src="IMG_20250227_100103_636.jpg" alt="Aarambh Batch 2025-26" className="homepage-image" />
        <h1>Aarambh Batch 2025-26</h1>
      </div>
    </div>
  );
};

export default Homepage;
