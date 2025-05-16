import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/global.css"; 
import mlogo from "../assets/ntmlogo.jpg";

const Subjects = () => {
  const navigate = useNavigate();

  // ✅ Redirect if user is not logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [navigate]);

  const subjects = [
    { name: "Science", path: "/lectures/Science" },
    { name: "Maths", path: "/lectures/Maths" },
    { name: "SST", path: "/lectures/SST" },
  ];

  return (
    <div className="subjects-container">
      {/* ✅ Display Logo */}
      <img src={mlogo}  alt="Logo" className="big-logo" />
      
      <h2>Select Subject</h2>

      {/* ✅ Subjects */}
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
