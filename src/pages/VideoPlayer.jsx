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

    playerRef.current = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      fluid: true,
      playbackRates: [0.5, 1, 1.5, 2, 2.5, 3],
      html5: {
        vhs: {
          overrideNative: true, // ✅ Enable custom HLS handling
          enableLowInitialPlaylist: true, // ✅ Faster quality switching
        }
      },
      controlBar: {
        children: [
          "playToggle",             // ✅ Play/Pause  
          "currentTimeDisplay",     // ✅ Current Time  
          "timeDivider",            // ✅ Divider  
          "durationDisplay",        // ✅ Total Duration  
          "playbackRateMenuButton", // ✅ Speed  
          "volumePanel",            // ✅ Volume  
          "qualitySelector",        // ✅ Quality  
          "fullscreenToggle"        // ✅ Fullscreen  
        ],
      },
    });

    playerRef.current.src({
      src: videoSource,
      type: "application/x-mpegURL",
    });

    // ✅ Force timestamp rendering with event listeners
    playerRef.current.ready(() => {
      const controlBar = playerRef.current.controlBar;

      if (!controlBar.getChild("currentTimeDisplay")) {
        controlBar.addChild("currentTimeDisplay", {}, 1);
      }
      if (!controlBar.getChild("timeDivider")) {
        controlBar.addChild("timeDivider", {}, 2);
      }
      if (!controlBar.getChild("durationDisplay")) {
        controlBar.addChild("durationDisplay", {}, 3);
      }

      playerRef.current.tech_.on("loadedmetadata", () => {
        playerRef.current.controlBar.show();
        playerRef.current.controlBar.currentTimeDisplay.show();
        playerRef.current.controlBar.timeDivider.show();
        playerRef.current.controlBar.durationDisplay.show();
      });

      // ✅ Fast quality switching
      const qualityLevels = playerRef.current.qualityLevels();
      qualityLevels.on("change", () => {
        const currentLevel = qualityLevels[qualityLevels.selectedIndex];
        console.log(`Switched to quality: ${currentLevel.height}p`);
      });

      if (playerRef.current.hlsQualitySelector) {
        playerRef.current.hlsQualitySelector({
          displayCurrentQuality: true,
        });
      }
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
          playerRef.current.currentTime(playerRef.current.currentTime() - 10);  // ⏪ Skip back
        } else if (tapX > (2 * videoWidth) / 3) {
          playerRef.current.currentTime(playerRef.current.currentTime() + 10);  // ⏩ Skip forward
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