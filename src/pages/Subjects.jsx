import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const subjects = ["SST", "Science", "Maths", "IT", "English", "Hindi"];

const Subjects = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Select a Subject</h2>
      <div className="subject-grid">
        {subjects.map((subject, index) => (
          <div key={index} className="subject-box" onClick={() => navigate(`/lectures/${subject}`)}>
            {subject}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;