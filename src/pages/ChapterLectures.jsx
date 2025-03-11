import React from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Lectures.css";

const ChapterLectures = () => {
  const { subject, chapterIndex } = useParams();

  const chapterLectures = {
    Science: {
      0: [
        { name: "Lecture 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4254694/173402301054458296383/173402301054458296383_8296383.m3u8" },
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
