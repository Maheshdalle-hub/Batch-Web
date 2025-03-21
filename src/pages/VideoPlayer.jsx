import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "video.js/dist/video-js.css";
import "videojs-hls-quality-selector";

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const lastTap = useRef(0);

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
    if (!videoRef.current) return;

    const videoSource = isLive ? defaultLiveUrl : m3u8Url || defaultLiveUrl;

    const player = new Plyr(videoRef.current, {
      controls: [
        "play", "progress", "current-time", "duration", "mute", "volume", "captions", 
        "settings", "fullscreen", "airplay"
      ],
      settings: ["speed", "quality", "loop"],
      speed: { selected: 1, options: [0.5, 1, 1.5, 2, 2.5] },
      quality: { default: 240, options: [240, 360, 720, 1080] },
    });

    player.source = {
      type: "video",
      title: lectureName || "Unknown Lecture",
      sources: [
        {
          src: videoSource,
          type: "application/x-mpegURL",
        },
      ],
    };

    // ✅ Gesture Controls (double tap and skip)
    const videoContainer = videoRef.current.parentElement;

    videoContainer.addEventListener("touchend", (event) => {
      const currentTime = Date.now();
      const tapGap = currentTime - lastTap.current;
      lastTap.current = currentTime;

      const touch = event.changedTouches[0];
      const rect = videoContainer.getBoundingClientRect();
      const tapX = touch.clientX - rect.left;
      const videoWidth = rect.width;

      if (tapGap < 300) {
        if (tapX < videoWidth / 3) {
          player.rewind(10);
        } else if (tapX > (2 * videoWidth) / 3) {
          player.forward(10);
        } else {
          player.togglePlay();
        }
      }
    });

    return () => {
      player.destroy();
    };
  }, [m3u8Url, isLive, playbackSpeed]);

  return (
    <div>
      <h2>
        {isLive ? "🔴 Live Class (nhi hua batch shuru)" : `Now Playing: ${chapterName} - ${lectureName || "Unknown Lecture"}`}
      </h2>

      <video ref={videoRef} className="plyr" />
    </div>
  );
};

export default VideoPlayer;