import React from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Lectures.css";
import mlogo from "../assets/ntmlogo.jpg";

const ChapterLectures = () => {
  const { subject, chapter } = useParams();

  // Define M3U8 links for each lecture
  const lectures = {
    Science: {
      "Chapter 1": [
        { name: "Lecture 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4254694/173402301054458296383/173402301054458296383_8296383.m3u8" },
        { name: "Lecture 2", m3u8Url: "YOUR_M3U8_LINK_2" },
      ],
      "Chapter 2": [
        { name: "Lecture 1", m3u8Url: "YOUR_M3U8_LINK_3" },
      ],
    },
    Maths: {
      "Chapter 1": [
        { name: "Lecture 1", m3u8Url: "YOUR_M3U8_LINK_4" },
      ],
    },
  };

  return (
    <div className="lectures-container">
      <img src={mlogo} alt="Logo" className="big-logo" />
      <h2>{chapter} - {subject}</h2>

      <div className="lecture-boxes">
        {lectures[subject]?.[chapter]?.map((lecture, index) => (
          <Link
            key={index}
            to={`/video/${subject}/${chapter}/${index}`}
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
