import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";
import { useLocation, useNavigate } from "react-router-dom";

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const lastTap = useRef(0);

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

    // ✅ Initialize the Video.js player
    playerRef.current = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      fluid: true,
      playbackRates: [0.5, 1, 1.25, 1.5, 1.75, 2],
      html5: {
        vhs: {
          overrideNative: true,
          enableLowInitialPlaylist: true,
        }
      },
      controlBar: {
        children: [
          "playToggle",
          "progressControl",
          "volumePanel",
          "playbackRateMenuButton",
          "qualitySelector",
          "fullscreenToggle"
        ],
      },
    });

    playerRef.current.src({
      src: videoSource,
      type: "application/x-mpegURL",
    });

    // ✅ Ensure Quality Levels and Selector
    playerRef.current.ready(() => {
      playerRef.current.qualityLevels();
      playerRef.current.hlsQualitySelector({
        displayCurrentQuality: true,
      });

      const controlBar = playerRef.current.controlBar;

      // ✅ Add custom current time and duration display
      const timeDisplay = document.createElement("div");
      timeDisplay.className = "vjs-custom-time-display";
      timeDisplay.style.position = "absolute";
      timeDisplay.style.bottom = "5px";
      timeDisplay.style.left = "10px";
      timeDisplay.style.background = "rgba(0, 0, 0, 0.6)";  // Semi-transparent background
      timeDisplay.style.color = "#fff";
      timeDisplay.style.fontSize = "12px";
      timeDisplay.style.padding = "4px 8px";
      timeDisplay.style.borderRadius = "4px";
      timeDisplay.style.zIndex = "10";
      timeDisplay.textContent = "00:00 / 00:00";

      // Append the time display near the progress bar
      const progressControl = controlBar.getChild("progressControl")?.el();
      if (progressControl) {
        progressControl.appendChild(timeDisplay);
      }

      // ✅ Listen for metadata and time updates
      playerRef.current.on("loadedmetadata", () => {
        const duration = formatTime(playerRef.current.duration());
        timeDisplay.textContent = `00:00 / ${duration}`;
      });

      playerRef.current.on("timeupdate", () => {
        const currentTime = formatTime(playerRef.current.currentTime());
        const duration = formatTime(playerRef.current.duration());
        timeDisplay.textContent = `${currentTime} / ${duration}`;
      });
    });

    // ✅ Double Tap Gesture Controls
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
          playerRef.current.currentTime(playerRef.current.currentTime() - 10);
        } else if (tapX > (2 * videoWidth) / 3) {
          playerRef.current.currentTime(playerRef.current.currentTime() + 10);
        } else {
          playerRef.current.paused() ? playerRef.current.play() : playerRef.current.pause();
        }
      }
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [m3u8Url, isLive]);

  // ✅ Time formatting function
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h2>
        {isLive ? "🔴 Live Class" : `Now Playing: ${chapterName} - ${lectureName || "Unknown Lecture"}`}
      </h2>

      <video ref={videoRef} className="video-js vjs-default-skin" />
    </div>
  );
};

export default VideoPlayer;