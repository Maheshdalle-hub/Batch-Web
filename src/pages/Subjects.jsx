import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css"; 
import mlogo from "../assets/ntmlogo.jpg";

const Subjects = () => {
  const subjects = [
    { name: "Science", path: "/lectures/Science" },
    { name: "Maths", path: "/lectures/Maths" },
    { name: "SST", path: "/lectures/SST" },
    { name: "English", path: "/lectures/English" },
    { name: "Hindi", path: "/lectures/Hindi" },
    { name: "IT", path: "/lectures/IT" },
  ];

  return (
    <div className="subjects-container">
      {/* ✅ Display Logo */}
      <img src={mlogo} alt="Logo" className="big-logo" />
      
      <h2>Select Subject</h2>

      {/* ✅ Live Class (Added Space Below) */}
      <div className="live-class-container">
        <Link
          to={`/video/live`}
          state={{ chapterName: "Live Class", m3u8Url: "m3u8_link_here" }}
          className="subject-box live-class-section"
        >
          🔴 Live Class (Click to Join)
        </Link>
      </div>

      {/* ✅ Subjects with Space Above */}
      <div className="subject-boxes">
        {subjects.map((subject, index) => (
          <Link key={index} to={subject.path} className="subject-box">
            {subject.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Subjects;
