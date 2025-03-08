import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Subjects from "./pages/Subjects";
import Lectures from "./pages/Lectures";
import VideoPlayer from "./pages/VideoPlayer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/lectures/:subject" element={<Lectures />} />
      <Route path="/video/:subject/:chapterIndex" element={<VideoPlayer />} />
    </Routes>
  );
}

export default App;
