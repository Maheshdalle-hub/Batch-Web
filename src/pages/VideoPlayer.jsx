import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const lastTap = useRef(0);
  const holdTimer = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const { chapterName, lectureName, m3u8Url } = location.state || {};
  const isLive = location.pathname.includes("/video/live");
  const defaultLiveUrl = "m3u8_link_here";

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = m3u8Url || defaultLiveUrl;
    video.playbackRate = playbackSpeed;

    // ✅ Gesture controls
    const handleTouchStart = (event) => {
      const touch = event.touches[0];
      const rect = video.getBoundingClientRect();
      const tapX = touch.clientX - rect.left;
      const videoWidth = rect.width;

      // ✅ Hold gesture for temporary 2x speed boost
      holdTimer.current = setTimeout(() => {
        video.playbackRate = 2;
      }, 600);

      const currentTime = Date.now();
      const tapGap = currentTime - lastTap.current;

      if (tapGap < 300) {
        if (tapX < videoWidth / 3) {
          video.currentTime -= 10;  // ⏪ Skip back
        } else if (tapX > (2 * videoWidth) / 3) {
          video.currentTime += 10;  // ⏩ Skip forward
        } else {
          togglePlay();
        }
      }
      lastTap.current = currentTime;
    };

    const handleTouchEnd = () => {
      clearTimeout(holdTimer.current);
      video.playbackRate = playbackSpeed;  // ✅ Restore normal speed
    };

    video.addEventListener("touchstart", handleTouchStart);
    video.addEventListener("touchend", handleTouchEnd);

    return () => {
      video.removeEventListener("touchstart", handleTouchStart);
      video.removeEventListener("touchend", handleTouchEnd);
    };
  }, [m3u8Url, playbackSpeed, defaultLiveUrl]);

  // ✅ Toggle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // ✅ Cycle through playback speeds
  const cycleSpeed = () => {
    const speeds = [0.5, 1, 1.25, 1.5, 2, 2.5, 3];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const newSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(newSpeed);
    videoRef.current.playbackRate = newSpeed;
  };

  return (
    <div>
      <h2>
        {isLive
          ? "🔴 Live Class (nhi hua batch shuru)"
          : `Now Playing: ${chapterName} - ${lectureName || "Unknown Lecture"}`}
      </h2>

      {/* ✅ Custom Video Player */}
      <div
        style={{
          position: "relative",
          maxWidth: "100%",
          background: "#000",
          overflow: "hidden",
          borderRadius: "8px",
        }}
      >
        {/* ✅ Video */}
        <video
          ref={videoRef}
          style={{ width: "100%", display: "block" }}
          playsInline
        />

        {/* ✅ Custom Controls */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            right: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          {/* ✅ Play/Pause Button */}
          <button
            onClick={togglePlay}
            style={{
              background: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {isPlaying ? "❚❚" : "▶️"}
          </button>

          {/* ✅ Speed Control Button */}
          <button
            onClick={cycleSpeed}
            style={{
              background: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {playbackSpeed}x
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;