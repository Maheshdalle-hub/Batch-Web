import React from "react";
import { Link, useParams } from "react-router-dom";

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
    <div>
      <h2>{subject} Lectures</h2>
      {lectures[subject]?.map((lecture, index) => (
        <Link
          key={index}
          to={`/video/${subject}/${index}`}
          state={{ chapterName: lecture.name, m3u8Url: lecture.m3u8Url }} // ✅ Pass data to VideoPlayer
        >
          <div className="lecture-box">{lecture.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default Lectures;
