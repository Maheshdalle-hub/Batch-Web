import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const Homepage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container">
      <div className="click-box" onClick={() => navigate("/subjects")}>
        <img src="YOUR_IMAGE_URL" alt="Aarambh Batch 2025-26" className="homepage-image" />
        <h1>Aarambh Batch 2025-26</h1>
      </div>
    </div>
  );
};

export default Homepage;
