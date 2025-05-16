import React, { useEffect, useRef, useState } from "react";
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
  const [studiedMinutes, setStudiedMinutes] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const chaptersName = localStorage.getItem("chapterName");
  const lecturesName = localStorage.getItem("lectureName");

  const { chapterName, lectureName, m3u8Url, notesUrl } = location.state || {};
  const isLive = location.pathname.includes("/live");
  const telegramDownloaderLink = "https://t.me/+UHFOhCOAU7xhYWY9"; // Replace with actual link

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const lastDate = localStorage.getItem("lastStudyDate");
    if (lastDate !== today) {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("studyTime_")) localStorage.removeItem(key);
      });
      localStorage.setItem("lastStudyDate", today);
    }

    const stored = parseFloat(localStorage.getItem(`studyTime_${today}`)) || 0;
    setStudiedMinutes(Math.floor(stored / 60));
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoSource = m3u8Url;

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
    });

    playerRef.current.src({
      src: videoSource,
      type: "application/x-mpegURL",
    });

    let sessionStart = null;
    let studyTimer = null;

    const updateStudyTime = () => {
      const now = Date.now();
      const elapsed = sessionStart ? (now - sessionStart) / 1000 : 0;
      sessionStart = now;
      const today = new Date().toLocaleDateString();
      const key = `studyTime_${today}`;
      const existing = parseFloat(localStorage.getItem(key)) || 0;
      const newTotal = existing + elapsed;
      localStorage.setItem(key, newTotal.toString());
      setStudiedMinutes(Math.floor(newTotal / 60));
    };

    playerRef.current.ready(() => {
      playerRef.current.qualityLevels();
      playerRef.current.hlsQualitySelector({
        displayCurrentQuality: true,
      });

      const controlBar = playerRef.current.controlBar;
      const playToggleEl = controlBar.getChild("playToggle")?.el();
      if (playToggleEl) {
        const timeDisplay = document.createElement("div");
        timeDisplay.className = "vjs-custom-time-display";
        timeDisplay.style.position = "absolute";
        timeDisplay.style.bottom = "50px";
        timeDisplay.style.left = "0";
        timeDisplay.style.background = "rgba(0, 0, 0, 0.7)";
        timeDisplay.style.color = "#fff";
        timeDisplay.style.fontSize = "13px";
        timeDisplay.style.padding = "4px 8px";
        timeDisplay.style.borderRadius = "4px";
        timeDisplay.style.whiteSpace = "nowrap";
        timeDisplay.style.pointerEvents = "none";
        timeDisplay.style.zIndex = "999";
        timeDisplay.textContent = "00:00 / 00:00";

        playToggleEl.style.position = "relative";
        playToggleEl.appendChild(timeDisplay);

        playerRef.current.on("loadedmetadata", () => {
          const duration = formatTime(playerRef.current.duration());
          timeDisplay.textContent = `00:00 / ${duration}`;
        });

        playerRef.current.on("timeupdate", () => {
          const currentTime = formatTime(playerRef.current.currentTime());
          const duration = formatTime(playerRef.current.duration());
          timeDisplay.textContent = `${currentTime} / ${duration}`;
        });
      }

      playerRef.current.on("play", () => {
        sessionStart = Date.now();
        clearInterval(studyTimer);
        studyTimer = setInterval(updateStudyTime, 10000);
      });

      playerRef.current.on("pause", () => {
        updateStudyTime();
        clearInterval(studyTimer);
      });

      playerRef.current.on("ended", () => {
        updateStudyTime();
        clearInterval(studyTimer);
      });
    });

    const videoContainer = videoRef.current.parentElement;
    const videoEl = videoRef.current;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    let holdTimeout = null;
    let speedHeld = false;

    const handleTouchStart = () => {
      if (!isMobile) return;
      holdTimeout = setTimeout(() => {
        if (playerRef.current && !speedHeld) {
          speedHeld = true;
          playerRef.current.playbackRate(2);
        }
      }, 1000);
    };

    const handleTouchEnd = () => {
      if (!isMobile) return;
      clearTimeout(holdTimeout);
      if (playerRef.current && speedHeld) {
        playerRef.current.playbackRate(1);
        speedHeld = false;
      }
    };

    const handleDoubleTap = (event) => {
      const currentTime = Date.now();
      const tapGap = currentTime - lastTap.current;
      lastTap.current = currentTime;

      const touch = event.changedTouches[0];
      const rect = videoContainer.getBoundingClientRect();
      const tapX = touch.clientX - rect.left;
      const width = rect.width;

      if (tapGap < 300) {
        if (tapX < width / 3) {
          playerRef.current.currentTime(playerRef.current.currentTime() - 10);
        } else if (tapX > (2 * width) / 3) {
          playerRef.current.currentTime(playerRef.current.currentTime() + 10);
        } else {
          playerRef.current.paused()
            ? playerRef.current.play()
            : playerRef.current.pause();
        }
      }
    };

    videoEl.addEventListener("touchstart", handleTouchStart);
    videoEl.addEventListener("touchend", handleTouchEnd);
    videoContainer.addEventListener("touchend", handleDoubleTap);

    return () => {
      videoEl.removeEventListener("touchstart", handleTouchStart);
      videoEl.removeEventListener("touchend", handleTouchEnd);
      videoContainer.removeEventListener("touchend", handleDoubleTap);
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
      clearInterval(studyTimer);
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

  const handleDownloadClick = () => {
    const fileName = `${chaptersName} ${lecturesName}`; // You can customize filename if you want
    const downloadUrl= m3u8Url;
    const intentUrl = `intent:${downloadUrl}#Intent;action=android.intent.action.VIEW;package=idm.internet.download.manager;scheme=1dmdownload;S.title=${encodeURIComponent(fileName)};end`;
    
  // Redirect to open in 1DM
  window.location.href = intentUrl;
};

  return (
    <div>
      <h2>
        {isLive
          ? "🔴 Live Class"
          : `Now Playing: ${chaptersName} - ${lecturesName || "Unknown Lecture"}`}
      </h2>

      <div style={{ position: "relative" }}>
        <video ref={videoRef} className="video-js vjs-default-skin" />
      </div>

      {!isLive && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={handleDownloadClick}
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            Download Lecture
          </button>
        </div>
      )}

      {showPopup && (
        <div style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          zIndex: 1000,
          textAlign: "center",
          maxWidth: "90%",
        }}>
          <p style={{ marginBottom: "15px", color: "#333" }}>
            Link copied to clipboard. Go to Telegram group, paste the link, and send to download the video.
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#ddd",
                border: "none",
                borderRadius: "5px",
                color: "#333",
                fontWeight: "bold",
                flex: 1,
                marginRight: "10px",
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => window.open(telegramDownloaderLink, "_blank")}
              style={{
                padding: "8px 16px",
                backgroundColor: "#007bff",
                border: "none",
                borderRadius: "5px",
                color: "#fff",
                fontWeight: "bold",
                flex: 1,
              }}
            >
              Go to Downloader
            </button>
          </div>
        </div>
      )}

      {notesUrl && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <a
            href={notesUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "12px 24px",
              backgroundColor: "#007bff",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Download Notes
          </a>
        </div>
      )}

      <div style={{
        textAlign: "center",
        fontSize: "12px",
        marginTop: "30px",
        color: "#ffffff"
      }}>
        Today’s Study Time: <strong>{studiedMinutes} min</strong>
      </div>
    </div>
  );
};

export default VideoPlayer;
