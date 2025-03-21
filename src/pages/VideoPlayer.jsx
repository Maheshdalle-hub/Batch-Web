import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-hls-quality-selector";
import Hls from "hls.js";
import { useLocation, useNavigate } from "react-router-dom";

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const lastTap = useRef(0);
  const holdTimer = useRef(null);

  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(0.5); // Default volume
  const [isFullscreen, setIsFullscreen] = useState(false);
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

    const videoElement = videoRef.current;

    // ✅ Initialize HLS.js for M3U8 support
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(m3u8Url || defaultLiveUrl);
      hls.attachMedia(videoElement);

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
    } else {
      videoElement.src = m3u8Url || defaultLiveUrl;
    }

    // ✅ Initialize Video.js
    playerRef.current = videojs(videoElement, {
      controls: true,
      autoplay: false,
      fluid: true,
      playbackRates: [0.5, 1, 1.25, 1.5, 2, 2.5],
    });

    const player = playerRef.current;

    player.ready(() => {
      // ✅ Quality selector
      if (player.hlsQualitySelector) {
        player.hlsQualitySelector({ displayCurrentQuality: true });
      }

      // ✅ Apply playback speed
      player.playbackRate(playbackSpeed);

      // ✅ Gesture controls
      const videoContainer = videoElement.parentElement;

      // ✅ Handle gestures
      videoContainer.addEventListener("touchstart", (event) => {
        const touch = event.touches[0];
        const rect = videoContainer.getBoundingClientRect();
        const tapX = touch.clientX - rect.left;
        const videoWidth = rect.width;

        // ✅ Swipe gestures for volume control
        if (tapX > videoWidth * 0.75) {
          player.volume(Math.min(1, player.volume() + 0.1));
          setVolume(player.volume());
        } else if (tapX < videoWidth * 0.25) {
          player.volume(Math.max(0, player.volume() - 0.1));
          setVolume(player.volume());
        }

        holdTimer.current = setTimeout(() => {
          player.playbackRate(2);  // ✅ 2x speed boost
        }, 600);

        const currentTime = Date.now();
        const tapGap = currentTime - lastTap.current;

        if (tapGap < 300) {
          if (tapX < videoWidth / 3) {
            player.currentTime(player.currentTime() - 10);  // ⏪ Skip back 10s
          } else if (tapX > (2 * videoWidth) / 3) {
            player.currentTime(player.currentTime() + 10);  // ⏩ Skip forward 10s
          } else {
            player.paused() ? player.play() : player.pause();
          }
        }

        lastTap.current = currentTime;
      });

      videoContainer.addEventListener("touchend", () => {
        clearTimeout(holdTimer.current);
        player.playbackRate(playbackSpeed);  // ✅ Restore original speed
      });
    });

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [m3u8Url, isLive, playbackSpeed]);

  // ✅ Toggle Fullscreen
  const toggleFullscreen = () => {
    if (playerRef.current) {
      const player = playerRef.current;

      if (isFullscreen) {
        player.exitFullscreen();
      } else {
        player.requestFullscreen();
      }

      setIsFullscreen(!isFullscreen);
    }
  };

  // ✅ Format time to hh:mm:ss
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

      {/* ✅ Advanced Video.js Player */}
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
          className="video-js vjs-default-skin"
          controls
          preload="auto"
          style={{ width: "100%", height: "100%" }}
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
            color: "#fff",
          }}
        >
          <div>
            <span>{formatTime(playerRef.current?.currentTime() || 0)} / </span>
            <span>{formatTime(playerRef.current?.duration() || 0)}</span>
          </div>

          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
            style={{ margin: "0 10px" }}
          >
            {[0.5, 1, 1.25, 1.5, 2, 2.5].map((speed) => (
              <option key={speed} value={speed}>
                {speed}x
              </option>
            ))}
          </select>

          <select
            value={selectedQuality}
            onChange={(e) => setSelectedQuality(e.target.value)}
            style={{ margin: "0 10px" }}
          >
            {qualityLevels.map((level, index) => (
              <option key={index} value={level.label}>
                {level.label}
              </option>
            ))}
          </select>

          <button onClick={toggleFullscreen}>
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;