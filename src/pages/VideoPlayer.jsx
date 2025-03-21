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
  const [playbackSpeed, setPlaybackSpeed] = useState(1);  // ✅ Persistent playback speed state

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

      // ✅ Add Playback Speed Menu
      const controlBar = playerRef.current.controlBar;
      if (controlBar && !controlBar.getChild("PlaybackRateMenuButton")) {
        controlBar.addChild("PlaybackRateMenuButton", {}, 8);
      }

      // ✅ Apply stored playback speed on player ready
      playerRef.current.playbackRate(playbackSpeed);
    });

    // ✅ Store the current playback speed
    const savePlaybackSpeed = () => {
      if (playerRef.current) {
        setPlaybackSpeed(playerRef.current.playbackRate());
      }
    };

    // ✅ Restore the saved playback speed
    const restorePlaybackSpeed = () => {
      if (playerRef.current) {
        playerRef.current.playbackRate(playbackSpeed);
      }
    };

    // ✅ Gesture controls
    const videoContainer = videoRef.current.parentElement;

    videoContainer.addEventListener("touchstart", (event) => {
      if (event.target.closest(".vjs-control-bar")) return;

      const touch = event.touches[0];
      const rect = videoContainer.getBoundingClientRect();
      const tapY = touch.clientY - rect.top;
      const videoHeight = rect.height;

      if (tapY > videoHeight - 50) return;

      holdTimer.current = setTimeout(() => {
        setPlaybackSpeed(2);  // ✅ Temporarily speed up
        playerRef.current.playbackRate(2);
      }, 600);
    });

    videoContainer.addEventListener("touchend", (event) => {
      if (event.target.closest(".vjs-control-bar")) return;

      clearTimeout(holdTimer.current);
      restorePlaybackSpeed();

      const currentTime = Date.now();
      const tapGap = currentTime - lastTap.current;
      lastTap.current = currentTime;

      const touch = event.changedTouches[0];
      const rect = videoContainer.getBoundingClientRect();
      const tapX = touch.clientX - rect.left;
      const videoWidth = rect.width;

      if (tapGap < 300) {
        savePlaybackSpeed();  // ✅ Save speed before gesture action
        if (tapX < videoWidth / 3) {
          playerRef.current.currentTime(playerRef.current.currentTime() - 10);
        } else if (tapX > (2 * videoWidth) / 3) {
          playerRef.current.currentTime(playerRef.current.currentTime() + 10);
        } else {
          playerRef.current.paused() ? playerRef.current.play() : playerRef.current.pause();
        }
        setTimeout(restorePlaybackSpeed, 100);  // ✅ Restore speed after gesture
      }
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [m3u8Url, isLive, playbackSpeed]);

  return (
    <div>
      <h2>
        {isLive ? "🔴 Live Class (nhi hua batch shuru)" : `Now Playing: ${chapterName} - ${lectureName || "Unknown Lecture"}`}
      </h2>
      
      {/* ✅ Fullscreen toggle button */}
      <button
        onClick={() => {
          if (playerRef.current) {
            if (playerRef.current.isFullscreen()) {
              playerRef.current.exitFullscreen();
            } else {
              playerRef.current.requestFullscreen();
            }
          }
        }}
        style={{
          marginBottom: "10px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Toggle Fullscreen
      </button>

      <video ref={videoRef} className="video-js vjs-default-skin custom-video-player" />
    </div>
  );
};

export default VideoPlayer;