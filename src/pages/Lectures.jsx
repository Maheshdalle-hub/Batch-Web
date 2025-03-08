import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const subjectsData = {
  Maths: [
    { name: "Chapter 1", m3u8: "https://example.com/math1.m3u8" },
    { name: "Chapter 2", m3u8: "https://example.com/math2.m3u8" }
  ],
  Science: [
    { name: "Chapter 1", m3u8: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4269594/173531897040688296383/173531897040688296383_8296383" },
    { name: "Chapter 2", m3u8: "https://example.com/science2.m3u8" }
  ]
};

const Lectures = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h2>{subject} Lectures</h2>
      {subjectsData[subject].map((chapter, index) => (
        <div key={index} onClick={() => navigate(`/video/${subject}/${index}`)} style={{ padding: 10, border: "1px solid black", margin: 5, cursor: "pointer" }}>
          {chapter.name}
        </div>
      ))}
    </div>
  );
};

export default Lectures;
