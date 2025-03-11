import React from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Lectures.css"; 
import mlogo from "../assets/ntmlogo.jpg";

const Lectures = () => {
  const { subject } = useParams();

  const lectures = {
    Science: [
      { name: "Chapter 1", index: 0 },
      { name: "Chapter 2", index: 1 },
    ],
    Maths: [
      { name: "Chapter 1", index: 0 },
      { name: "Chapter 2", index: 1 },
    ],
  };

  return (
    <div className="lectures-container">
      <img src={mlogo} alt="Logo" className="big-logo" />
      <h2>{subject} Lectures</h2>
      <div className="lecture-boxes">
        <div className="live-class-section">🔴 Live Class (Click to Join)</div>
        {lectures[subject]?.map((lecture, index) => (
          <Link
            key={index}
            to={`/chapter-lectures/${subject}/${lecture.index}`}
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
