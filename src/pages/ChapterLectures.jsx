import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styles/ChapterLectures.css";
import mlogo from "../assets/ntmlogo.jpg"; // ✅ Import logo

const ChapterLectures = () => {
  const { subject, chapterIndex } = useParams();
  const navigate = useNavigate();

  // ✅ Redirect if user is not logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login
    }
  }, [navigate]);

  const chapterLectures = {
    Science: {
      0: [
        { name: "Lecture 1 (nhi hua batch shuru) ", m3u8Url: "m3u8_link_here" },
        { name: "Lecture 2", m3u8Url: "YOUR_M3U8_LINK_HERE" },
      ],
      1: [
        { name: "Lecture 1", m3u8Url: "YOUR_M3U8_LINK_HERE" },
      ],
    },
    Maths: {
      0: [
        { name: "Lecture 1", m3u8Url: "YOUR_M3U8_LINK_HERE" },
        { name: "Lecture 2", m3u8Url: "YOUR_M3U8_LINK_HERE" },
      ],
    },
  };

  return (
    <div className="chapter-lectures-container">
      {/* ✅ Big Logo at the Top */}
      <img src={mlogo} alt="Logo" className="big-logo" />
      
      <h2>{subject} - Chapter {parseInt(chapterIndex) + 1}</h2>
      <div className="lecture-boxes">
        {chapterLectures[subject]?.[chapterIndex]?.map((lecture, index) => (
          <Link
            key={index}
            to={`/video/${subject}/${chapterIndex}`}
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

export default ChapterLectures;
