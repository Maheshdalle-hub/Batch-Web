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
  const [volume, setVolume] = useState(0.5); 
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

    playerRef.current = videojs(videoElement, {
      controls: false,   // 🔥 No HTML5 buttons
      autoplay: false,
      fluid: true,
      playbackRates: [0.5, 1, 1.25, 1.5, 2, 2.5],
    });

    const player = playerRef.current;

    player.ready(() => {
      if (player.hlsQualitySelector) {
        player.hlsQualitySelector({ displayCurrentQuality: true });
      }

      player.playbackRate(playbackSpeed);

      const videoContainer = videoElement.parentElement;

      videoContainer.addEventListener("touchstart", (event) => {
        const touch = event.touches[0];
        const rect = videoContainer.getBoundingClientRect();
        const tapX = touch.clientX - rect.left;
        const videoWidth = rect.width;

        if (tapX > videoWidth * 0.75) {
          player.volume(Math.min(1, player.volume() + 0.1));
          setVolume(player.volume());
        } else if (tapX < videoWidth * 0.25) {
          player.volume(Math.max(0, player.volume() - 0.1));
          setVolume(player.volume());
        }

        holdTimer.current = setTimeout(() => {
          player.playbackRate(2);
        }, 600);

        const currentTime = Date.now();
        const tapGap = currentTime - lastTap.current;

        if (tapGap < 300) {
          if (tapX < videoWidth / 3) {
            player.currentTime(player.currentTime() - 10);
          } else if (tapX > (2 * videoWidth) / 3) {
            player.currentTime(player.currentTime() + 10);
          } else {
            player.paused() ? player.play() : player.pause();
          }
        }

        lastTap.current = currentTime;
      });

      videoContainer.addEventListener("touchend", () => {
        clearTimeout(holdTimer.current);
        player.playbackRate(playbackSpeed);
      });
    });

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [m3u8Url, isLive, playbackSpeed]);

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

      {/* ✅ Advanced Player */}
      <div>
        {/* ✅ Video element with no HTML5 controls */}
        <video
          ref={videoRef}
          className="video-js vjs-default-skin"
          preload="auto"
          style={{ width: "100%", height: "100%" }}
        />

        {/* ✅ Custom Controls */}
        <div>
          <div>
            <span>{formatTime(playerRef.current?.currentTime() || 0)} / </span>
            <span>{formatTime(playerRef.current?.duration() || 0)}</span>
          </div>

          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
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