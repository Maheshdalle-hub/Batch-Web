import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/player.css"; // YouTube-style CSS

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [qualityLevels, setQualityLevels] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState("auto");
  const lastTap = useRef(0);
  const holdTimer = useRef(null);

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
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    }

    // ✅ Gesture Controls
    const handleTouchStart = (event) => {
      const touch = event.touches[0];
      const rect = video.getBoundingClientRect();
      const tapX = touch.clientX - rect.left;
      const videoWidth = rect.width;

      holdTimer.current = setTimeout(() => {
        video.playbackRate = 2; // ✅ Temporary speed boost
      }, 600);

      const currentTime = Date.now();
      const tapGap = currentTime - lastTap.current;

      if (tapGap < 300) {
        if (tapX < videoWidth / 3) {
          video.currentTime -= 10; // ⏪ Skip back 10 seconds
        } else if (tapX > (2 * videoWidth) / 3) {
          video.currentTime += 10; // ⏩ Skip forward 10 seconds
        } else {
          video.paused ? video.play() : video.pause();
        }
      }
      lastTap.current = currentTime;
    };

    const handleTouchEnd = () => {
      clearTimeout(holdTimer.current);
      videoRef.current.playbackRate = playbackRate;
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
  }, [m3u8Url, defaultLiveUrl, playbackRate]);

  const handleQualityChange = (index) => {
    const video = videoRef.current;
    if (video && Hls.isSupported()) {
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

  return (
    <div>
      <h2>
        {isLive
          ? "🔴 Live Class (nhi hua batch shuru)"
          : `Now Playing: ${chapterName} - ${lectureName || "Unknown Lecture"}`}
      </h2>

      {/* ✅ Video Player */}
      <div className="youtube-player-wrapper">
        <video ref={videoRef} className="youtube-video" controls />
        
        {/* ✅ Quality Selection */}
        <div className="quality-selector">
          <label>Quality: </label>
          <select
            value={selectedQuality}
            onChange={(e) => handleQualityChange(parseInt(e.target.value))}
          >
            {qualityLevels.map((level, index) => (
              <option key={index} value={level.index}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Playback Speed */}
        <div className="playback-speed">
          <label>Speed: </label>
          <select
            value={playbackRate}
            onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
          >
            {[0.5, 1, 1.5, 2, 2.5, 3].map((rate) => (
              <option key={rate} value={rate}>
                {rate}x
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;