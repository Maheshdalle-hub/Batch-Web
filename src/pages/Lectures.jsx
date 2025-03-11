import React from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/lectures.css"; // ✅ Use the correct CSS file

const Lectures = () => {
  const { subject } = useParams();

  // Define M3U8 links for each chapter
  const lectures = {
    Science: [
      { name: "Chapter 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4254694/173402301054458296383/173402301054458296383_8296383.m3u8" },
      { name: "Chapter 2", m3u8Url: "YOUR_M3U8_LINK_HERE" },
    ],
    Maths: [
      { name: "Chapter 1", m3u8Url: "YOUR_M3U8_LINK_HERE" },
      { name: "Chapter 2", m3u8Url: "YOUR_M3U8_LINK_HERE" },
    ],
  };

  return (
    <div className="lectures-container">
      {/* ✅ Big Logo at the Top */}
      <img src="https://images.app.goo.gl/mm63uNUVpmDpUFU99" alt="Logo" className="big-logo" />

      <h2>{subject} Lectures</h2>
      <div className="lecture-boxes">
        {/* ✅ Live Class Section */}
        <div className="live-class-section">
          🔴 Live Class (Click to Join)
        </div>

        {/* ✅ Chapter Boxes */}
        {lectures[subject]?.map((lecture, index) => (
          <Link
            key={index}
            to={`/video/${subject}/${index}`}
            state={{ chapterName: lecture.name, m3u8Url: lecture.m3u8Url }}
            className="lecture-box"
          >
            {lecture.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Lectures;
