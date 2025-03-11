import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styles/Lectures.css";
import mlogo from "../assets/ntmlogo.jpg";

const Lectures = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  // Define chapters for each subject
  const chapters = {
    Science: ["Chapter 1", "Chapter 2"],
    Maths: ["Chapter 1", "Chapter 2"],
    SST: ["Chapter 1", "Chapter 2"], 
    IT: ["Chapter 1", "Chapter 2"],
    English: ["Chapter 1"],
  };

  // ✅ Define M3U8 Live Class links
  const liveClassLinks = {
    Science: "YOUR_SCIENCE_LIVE_M3U8_LINK",
    Maths: "YOUR_MATHS_LIVE_M3U8_LINK",
    SST: "YOUR_SST_LIVE_M3U8_LINK",
  };

  return (
    <div className="lectures-container">
      <img src={mlogo} alt="Logo" className="big-logo" />
      <h2>{subject} Chapters</h2>

      {/* ✅ Live Class Section (Only for subjects with M3U8 live streams) */}
      {liveClassLinks[subject] && (
        <div
          className="live-class-section"
          onClick={() =>
            navigate("/video/live", { state: { chapterName: "Live Class", m3u8Url: liveClassLinks[subject] } })
          }
        >
          🔴 Live Class (Click to Watch)
        </div>
      )}

      <div className="lecture-boxes">
        {chapters[subject]?.map((chapter, index) => (
          <Link key={index} to={`/lectures/${subject}/${chapter}`} className="lecture-box">
            {chapter}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Lectures;
