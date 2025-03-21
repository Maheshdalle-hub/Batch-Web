import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-hls-quality-selector";
import { useLocation, useNavigate } from "react-router-dom";

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const lastTap = useRef(0);
  const holdTimer = useRef(null);

  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [qualityLevels, setQualityLevels] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState("auto");

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
    if (!videoRef.current) return;

    // ✅ Initialize Video.js player
    playerRef.current = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      fluid: true,
      playbackRates: [0.5, 1, 1.5, 2, 2.5, 3],
    });

    const videoSource = isLive ? defaultLiveUrl : m3u8Url || defaultLiveUrl;

    if (!videoSource) {
      console.error("❌ No video source provided!");
      return;
    }

    playerRef.current.src({
      src: videoSource,
      type: "application/x-mpegURL",
    });

    playerRef.current.ready(() => {
      if (playerRef.current.hlsQualitySelector) {
        playerRef.current.hlsQualitySelector({ displayCurrentQuality: true });
      }

      // ✅ Apply saved playback speed
      playerRef.current.playbackRate(playbackSpeed);

      // ✅ Add Playback Speed Menu
      const controlBar = playerRef.current.controlBar;
      if (controlBar && !controlBar.getChild("PlaybackRateMenuButton")) {
        controlBar.addChild("PlaybackRateMenuButton", {}, 8);
      }
    });

    // ✅ Gesture controls
    const videoContainer = videoRef.current.parentElement;

    videoContainer.addEventListener("touchstart", (event) => {
      if (event.target.closest(".vjs-control-bar")) return;

      const touch = event.touches[0];
      const rect = videoContainer.getBoundingClientRect();
      const tapX = touch.clientX - rect.left;
      const videoWidth = rect.width;

      // ✅ Hold to temporarily speed up
      holdTimer.current = setTimeout(() => {
        setPlaybackSpeed(2);  // Temporary speed boost
        playerRef.current.playbackRate(2);
      }, 600);

      const currentTime = Date.now();
      const tapGap = currentTime - lastTap.current;
      lastTap.current = currentTime;

      if (tapGap < 300) {
        if (tapX < videoWidth / 3) {
          playerRef.current.currentTime(playerRef.current.currentTime() - 10);  // ⏪ Skip back
        } else if (tapX > (2 * videoWidth) / 3) {
          playerRef.current.currentTime(playerRef.current.currentTime() + 10);  // ⏩ Skip forward
        } else {
          playerRef.current.paused() ? playerRef.current.play() : playerRef.current.pause();
        }
      }
    });

    videoContainer.addEventListener("touchend", () => {
      clearTimeout(holdTimer.current);
      playerRef.current.playbackRate(playbackSpeed);
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [m3u8Url, isLive, playbackSpeed]);

  // ✅ Handle Speed Change
  const handleSpeedChange = (event) => {
    const newSpeed = parseFloat(event.target.value);
    setPlaybackSpeed(newSpeed);
    if (playerRef.current) {
      playerRef.current.playbackRate(newSpeed);
    }
  };

  return (
    <div>
      <h2>
        {isLive
          ? "🔴 Live Class (nhi hua batch shuru)"
          : `Now Playing: ${chapterName} - ${lectureName || "Unknown Lecture"}`}
      </h2>

      {/* ✅ Playback Speed Control */}
      <div style={{ marginBottom: "15px" }}>
        <label>Speed: </label>
        <select
          value={playbackSpeed}
          onChange={handleSpeedChange}
          style={{ padding: "5px", fontSize: "14px" }}
        >
          {[0.5, 1, 1.25, 1.5, 2, 2.5, 3].map((rate) => (
            <option key={rate} value={rate}>
              {rate}x
            </option>
          ))}
        </select>
      </div>

      <video ref={videoRef} className="video-js vjs-default-skin custom-video-player" />
    </div>
  );
};

export default VideoPlayer;