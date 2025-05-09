import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styles/ChapterLectures.css";
import mlogo from "../assets/ntmlogo.jpg"; // ✅ Import logo

const ChapterLectures = () => {
  const { subject, chapterIndex } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const chapterLectures = {
    Notice: {
      0: [
        {
          name: "Introduction Video",
          m3u8Url: "https://d3cx6qbbd4cbso.cloudfront.net/file_library/videos/vod_non_drm_ios/4312904/1740491033_1089325762901906/sunny/1740490966781_94603654451027820_video_VOD.m3u8",
          notesUrl: ""
        },
      ],
    },
    Science: {
      0: [
        {
          name: "Lecture 1 (nhi hua batch shuru)",
          m3u8Url: "m3u8_link_here",
          notesUrl: ""
        },
        {
          name: "Lecture 2",
          m3u8Url: "YOUR_M3U8_LINK_HERE",
          notesUrl: ""
        },
      ],
      1: [
        {
          name: "Lecture 1",
          m3u8Url: "YOUR_M3U8_LINK_HERE",
          notesUrl: ""
        },
      ],
    },
    Maths: {
      0: [
        {
          name: "Lecture 1",
          m3u8Url: "YOUR_M3U8_LINK_HERE",
          notesUrl: ""
        },
        {
          name: "Lecture 2",
          m3u8Url: "YOUR_M3U8_LINK_HERE",
          notesUrl: ""
        },
      ],
    },
  };

  return (
    <div className="chapter-lectures-container">
      <img src={mlogo} alt="Logo" className="big-logo" />

      <h2>{subject} - Chapter {parseInt(chapterIndex) + 1}</h2>
      <div className="lecture-boxes">
        {chapterLectures[subject]?.[chapterIndex]?.map((lecture, index) => (
          <Link
            key={index}
            to={`/video/${subject}/${chapterIndex}`}
            state={{
              chapterName: lecture.name,
              m3u8Url: lecture.m3u8Url,
              notesUrl: lecture.notesUrl,
            }}
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