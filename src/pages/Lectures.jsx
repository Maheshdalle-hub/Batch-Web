import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/global.css";

const chapters = [
  { name: "Chapter 1", m3u8: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4269594/173531897040688296383/173531897040688296383_8296383.m3u8" },
  { name: "Chapter 2", m3u8: "M3U8_LINK_FOR_CHAPTER_2" },
  { name: "Chapter 3", m3u8: "M3U8_LINK_FOR_CHAPTER_3" }
];

const Lectures = () => {
  const navigate = useNavigate();
  const { subject } = useParams();

  return (
    <div className="container">
      <h2>{subject} - Lectures</h2>
      <div className="chapter-grid">
        {chapters.map((chapter, index) => (
          <div 
            key={index} 
            className="chapter-box" 
            onClick={() => navigate(`/video/${encodeURIComponent(chapter.m3u8)}`)}
          >
            {chapter.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lectures;