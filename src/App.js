import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Subjects from "./pages/Subjects";
import Lectures from "./pages/Lectures";
import VideoPlayer from "./pages/VideoPlayer";
import BookSelection from "./pages/BookSelection"; // ✅ New page for books
import ChapterSelection from "./pages/ChapterSelection"; // ✅ New page for chapters

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/books/:subject" element={<BookSelection />} /> {/* ✅ New */}
      <Route path="/chapters/:book" element={<ChapterSelection />} /> {/* ✅ New */}
      <Route path="/lectures/:book/:chapterIndex" element={<Lectures />} />
      <Route path="/video/:book/:chapterIndex" element={<VideoPlayer />} />
    </Routes>
  );
}

export default App;
