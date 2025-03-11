import React from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Lectures.css"; // ✅ Reuse styles

const ChapterSelection = () => {
  const { book } = useParams();

  // Define chapters per book
  const chapters = {
    "First Flight": ["Chapter 1", "Chapter 2", "Chapter 3"],
    "Footprints Without Feet": ["Chapter 1", "Chapter 2"],
    "English Grammar": ["Tenses", "Active & Passive"],
    "Kshitij": ["Chapter 1", "Chapter 2"],
    "Kritika": ["Chapter 1", "Chapter 2"],
    "Hindi Grammar": ["Sandhi", "Samas"],
  };

  return (
    <div className="lectures-container">
      <h2>{book} Chapters</h2>
      <div className="lecture-boxes">
        {chapters[book]?.map((chapter, index) => (
          <Link key={index} to={`/lectures/${book}/${index}`} className="lecture-box">
            {chapter}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChapterSelection;
