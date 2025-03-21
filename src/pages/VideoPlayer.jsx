import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Hls from "hls.js";

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const lastTap = useRef(0);
  const holdTimer = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [qualityLevels, setQualityLevels] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState("auto");
  const [volume, setVolume] = useState(0.5); // Default volume
  const [isFullscreen, setIsFullscreen] = useState(false);

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

    let hls;
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(m3u8Url || defaultLiveUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const levels = hls.levels.map((level, index) => ({
          label: `${level.height}p`,
          index,
        }));
        setQualityLevels([{ label: "Auto", index: -1 }, ...levels]);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS error:", data);
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = m3u8Url || defaultLiveUrl;
    }

    // ✅ Gesture controls
    const handleTouchStart = (event) => {
      const touch = event.touches[0];
      const rect = video.getBoundingClientRect();
      const tapX = touch.clientX - rect.left;
      const tapY = touch.clientY - rect.top;
      const videoWidth = rect.width;
      const videoHeight = rect.height;

      // ✅ Swipe gestures for volume control
      if (tapX > videoWidth * 0.75) {
        // Right side -> Volume
        video.volume = Math.min(1, video.volume + 0.1);
        setVolume(video.volume);
      } else if (tapX < videoWidth * 0.25) {
        // Left side -> Lower volume
        video.volume = Math.max(0, video.volume - 0.1);
        setVolume(video.volume);
      }

      // ✅ Hold gesture for 2x speed
      holdTimer.current = setTimeout(() => {
        video.playbackRate = 2;  // ✅ Temporary speed boost
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
      videoRef.current.playbackRate = playbackSpeed;  // ✅ Restore speed
    };

    video.addEventListener("touchstart", handleTouchStart);
    video.addEventListener("touchend", handleTouchEnd);

    return () => {
      video.removeEventListener("touchstart", handleTouchStart);
      video.removeEventListener("touchend", handleTouchEnd);
      if (hls) {
        hls.destroy();
      }
    };
  }, [m3u8Url, defaultLiveUrl, playbackSpeed]);

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

  // ✅ Handle speed change
  const changeSpeed = (speed) => {
    setPlaybackSpeed(speed);
    videoRef.current.playbackRate = speed;
  };

  // ✅ Handle quality change
  const handleQualityChange = (index) => {
    if (Hls.isSupported()) {
      const video = videoRef.current;
      const hls = video.hls;
      if (index === -1) {
        hls.currentLevel = -1; // Auto quality
        setSelectedQuality("auto");
      } else {
        hls.currentLevel = index;
        setSelectedQuality(qualityLevels[index + 1]?.label || "auto");
      }
    }
  };

  // ✅ Toggle fullscreen
  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // ✅ Convert time to hh:mm:ss format
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours > 0 ? `${hours}:` : ""}${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div>
      <h2>
        {isLive
          ? "🔴 Live Class (nhi hua batch shuru)"
          : `Now Playing: ${chapterName} - ${lectureName || "Unknown Lecture"}`}
      </h2>

      {/* ✅ Advanced Video Player */}
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
          controls={false}
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
          <button onClick={togglePlay}>
            {isPlaying ? "❚❚" : "▶️"}
          </button>

          <select onChange={(e) => changeSpeed(parseFloat(e.target.value))}>
            {[0.5, 1, 1.25, 1.5, 2, 2.5, 3].map((speed) => (
              <option key={speed} value={speed}>{speed}x</option>
            ))}
          </select>

          <select onChange={(e) => handleQualityChange(parseInt(e.target.value))}>
            {qualityLevels.map((level, index) => (
              <option key={index} value={level.index}>
                {level.label}
              </option>
            ))}
          </select>

          <div>
            {formatTime(videoRef.current?.currentTime || 0)} /{" "}
            {formatTime(videoRef.current?.duration || 0)}
          </div>

          <button onClick={toggleFullscreen}>
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;