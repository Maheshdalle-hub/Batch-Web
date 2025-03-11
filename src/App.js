import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Subjects from "./pages/Subjects";
import Lectures from "./pages/Lectures";
import ChapterLectures from "./pages/ChapterLectures"; // ✅ Added new page
import VideoPlayer from "./pages/VideoPlayer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/lectures/:subject" element={<Lectures />} />
      <Route path="/lectures/:subject/:chapter" element={<ChapterLectures />} /> {/* ✅ New Route */}
      <Route path="/video/:subject/:chapter/:lectureIndex" element={<VideoPlayer />} />
      <Route path="/video/live" element={<VideoPlayer />} /> {/* ✅ Live Class Route */}
    </Routes>
  );
}

export default App;
