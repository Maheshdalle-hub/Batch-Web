import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styles/Lectures.css"; 

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
    ],
    Maths: [
      { name: "Maths Lectures", index: 0 },
    ],
    SST: [
      { name: "SST Lectures", index: 0 },
    ],
  };

  return (
    <div className="lectures-container">
      <img src="https://dxixtlyravvxx.cloudfront.net/540/admin_v1/sample/35218290_Aarambh%2010th%20Weekly%20Planner.png" alt="Weekly Planner" className="tt" />
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
