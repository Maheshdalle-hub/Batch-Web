import React from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Lectures.css"; // ✅ Use the correct CSS file
import mlogo from "../assets/ntmlogo.jpg";

const Lectures = () => {
  const { subject } = useParams();

  // Define M3U8 links for each chapter & lecture
  const lectures = {
    Science: {
      "Chapter 1": [
        { name: "Lecture 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4254694/173402301054458296383/173402301054458296383_8296383.m3u8" },
        { name: "Lecture 2", m3u8Url: "YOUR_M3U8_LINK_HERE" },
      ],
      "Chapter 2": [
        { name: "Lecture 1", m3u8Url: "YOUR_M3U8_LINK_HERE" },
        { name: "Lecture 2", m3u8Url: "YOUR_M3U8_LINK_HERE" },
      ],
    },
    Maths: {
      "Chapter 1": [
        { name: "Lecture 1", m3u8Url: "YOUR_M3U8_LINK_HERE" },
        { name: "Lecture 2", m3u8Url: "YOUR_M3U8_LINK_HERE" },
      ],
      "Chapter 2": [
        { name: "Lecture 1", m3u8Url: "YOUR_M3U8_LINK_HERE" },
        { name: "Lecture 2", m3u8Url: "YOUR_M3U8_LINK_HERE" },
      ],
    },
  };

  // Subjects that have live classes
  const subjectsWithLive = ["Science", "Maths", "SST"];

  return (
    <div className="lectures-container">
      {/* ✅ Big Logo at the Top */}
      <img src={mlogo} alt="Logo" className="big-logo" />

      <h2>{subject} Lectures</h2>

      <div className="lecture-boxes">
        {/* ✅ Show Live Class Only for Certain Subjects */}
        {subjectsWithLive.includes(subject) && (
          <div className="live-class-section">
            🔴 Live Class (Click to Join)
          </div>
        )}

        {/* ✅ Loop Through Chapters */}
        {lectures[subject] &&
          Object.entries(lectures[subject]).map(([chapter, lectureList], chapterIndex) => (
            <div key={chapterIndex} className="chapter-container">
              <h3 className="chapter-title">{chapter}</h3>

              {/* ✅ Loop Through Lectures in Each Chapter */}
              <div className="lecture-list">
                {lectureList.map((lecture, lectureIndex) => (
                  <Link
                    key={lectureIndex}
                    to={`/video/${subject}/${chapterIndex}/${lectureIndex}`}
                    state={{ chapterName: chapter, lectureName: lecture.name, m3u8Url: lecture.m3u8Url }}
                    className="lecture-box"
                  >
                    {lecture.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Lectures;
