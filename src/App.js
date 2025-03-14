import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Subjects from "./pages/Subjects";
import Lectures from "./pages/Lectures";
import VideoPlayer from "./pages/VideoPlayer";
import ChapterLectures from "./pages/ChapterLectures";
import Login from "./pages/Login";
import Verify from "./pages/Verify"; // ✅ Ensures verification with userToken
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify/:token" element={<Verify />} />  {/* ✅ Verifies userToken, NOT alias */}

      {/* ✅ Protected Routes (Accessible only after verification) */}
      <Route path="/subjects" element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
      <Route path="/lectures/:subject" element={<ProtectedRoute><Lectures /></ProtectedRoute>} />
      <Route path="/chapter-lectures/:subject/:chapterIndex" element={<ProtectedRoute><ChapterLectures /></ProtectedRoute>} />
      <Route path="/video/:subject/:chapterIndex" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />
      <Route path="/video/live" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />  
    </Routes>
  );
}

export default App;
