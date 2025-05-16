import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styles/Lectures.css"; 
import mlogo from "../assets/ntmlogo.jpg";

const Lectures = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  // ✅ Redirect if user is not logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login
    }
  }, [navigate]);

  const lectures = {
    Science: [
      { name: "Science Lectures", index: 0 },
      { name: "Science PDF", index: 1},
    ],
    Maths: [
      { name: "Maths Lectures", index: 0 },
      { name: "Maths PDF", index: 1},
    ],
    SST: [
      { name: "SST Lectures", index: 0 },
      { name: "SST PDF", index: 1},
    ],
  };

  return (
    <div className="lectures-container">
      <img src={mlogo} alt="Logo" className="tt" />
      <h2>{subject} Lectures</h2>
      <div className="lecture-boxes">
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
