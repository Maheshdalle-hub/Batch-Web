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

  const { chapterName, lectureName, m3u8Url, notesUrl } = location.state || {};
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

    playerRef.current = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      fluid: true,
      playbackRates: [0.5, 1, 1.25, 1.5, 1.75, 2],
      html5: {
        vhs: {
          overrideNative: true,
          enableLowInitialPlaylist: true,
        },
      },
      controlBar: {
        children: [
          "playToggle",
          "progressControl",
          "volumePanel",
          "playbackRateMenuButton",
          "qualitySelector",
          "fullscreenToggle",
        ],
      },
    });

    playerRef.current.src({
      src: videoSource,
      type: "application/x-mpegURL",
    });

    playerRef.current.ready(() => {
      playerRef.current.qualityLevels();
      playerRef.current.hlsQualitySelector({
        displayCurrentQuality: true,
      });

      const timeDisplay = document.createElement("div");
      timeDisplay.className = "vjs-custom-time-display";
      timeDisplay.style.position = "absolute";
      timeDisplay.style.bottom = "50px";
      timeDisplay.style.left = "50%";
      timeDisplay.style.transform = "translateX(-50%)";
      timeDisplay.style.background = "rgba(0, 0, 0, 0.6)";
      timeDisplay.style.color = "#fff";
      timeDisplay.style.fontSize = "12px";
      timeDisplay.style.padding = "4px 8px";
      timeDisplay.style.borderRadius = "4px";
      timeDisplay.style.zIndex = "10";
      timeDisplay.textContent = "00:00 / 00:00";

      const controlBar = playerRef.current.controlBar;
      const playToggle = controlBar.getChild("playToggle")?.el();
      if (playToggle) {
        playToggle.parentNode.insertBefore(timeDisplay, playToggle);
      }

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
          playerRef.current.paused()
            ? playerRef.current.play()
            : playerRef.current.pause();
        }
      }
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [m3u8Url, isLive]);

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      <h2>
        {isLive
          ? "🔴 Live Class"
          : `Now Playing: ${chapterName} - ${lectureName || "Unknown Lecture"}`}
      </h2>

      <div style={{ maxWidth: "1000px", margin: "auto" }}>
        <video
          ref={videoRef}
          className="video-js vjs-default-skin"
        />
      </div>

      {notesUrl && (
        <a
          href={notesUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: "20px",
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            fontWeight: "bold",
            textDecoration: "none",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            transition: "all 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          View Notes
        </a>
      )}
    </div>
  );
};

export default VideoPlayer;