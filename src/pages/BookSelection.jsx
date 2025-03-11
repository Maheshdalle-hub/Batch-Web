import React from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Lectures.css"; // ✅ Reuse styles

const BookSelection = () => {
  const { subject } = useParams();

  // Define books for English & Hindi
  const books = {
    English: [
      { name: "First Flight" },
      { name: "Footprints Without Feet" },
      { name: "English Grammar" },
    ],
    Hindi: [
      { name: "Kshitij" },
      { name: "Kritika" },
      { name: "Hindi Grammar" },
    ],
  };

  return (
    <div className="lectures-container">
      <h2>Select {subject} Book</h2>
      <div className="lecture-boxes">
        {books[subject]?.map((book, index) => (
          <Link key={index} to={`/chapters/${book.name}`} className="lecture-box">
            {book.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookSelection;
