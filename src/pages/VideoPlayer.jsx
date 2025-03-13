import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-hls-quality-selector";
import { useLocation } from "react-router-dom";

const VideoPlayer = () => {
  const location = useLocation();
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const lastTap = useRef(0);
  const holdTimer = useRef(null);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth); 

  // ✅ Extract passed state
  const { chapterName, lectureName, m3u8Url } = location.state || {};

  // ✅ Detect if it's a Live Class
  const isLive = location.pathname.includes("/video/live");

  // ✅ Default Live Class URL
  const defaultLiveUrl = "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4254694/173402301054458296383/173402301054458296383_8296383.m3u8";

  useEffect(() => {
    if (!videoRef.current) return;

    playerRef.current = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      fluid: true,
      playbackRates: [0.5, 1, 1.5, 2],
    });

    // ✅ Set correct video source
    const videoSource = isLive ? defaultLiveUrl : m3u8Url;
    if (!videoSource) {
      console.error("❌ No video source provided!");
      return;
    }

    playerRef.current.src({
      src: videoSource,
      type: "application/x-mpegURL",
    });

    // ✅ Enable HLS Quality Selector
    playerRef.current.ready(() => {
      if (playerRef.current.hlsQualitySelector) {
        playerRef.current.hlsQualitySelector({ displayCurrentQuality: true });
      }
    });

    // ✅ Detect device orientation
    const updateOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener("resize", updateOrientation);
    updateOrientation(); // Check initial orientation

    // ✅ Fullscreen Handling Based on User's Holding Position
    const toggleFullscreen = () => {
      const player = playerRef.current.el();
      if (!document.fullscreenElement) {
        player.requestFullscreen({ navigationUI: "hide" }).catch(err => console.error("Fullscreen error:", err));
        
        // ✅ Adjust screen rotation dynamically
        if (isPortrait) {
          player.style.transform = "rotate(0deg)";
        } else {
          player.style.transform = "rotate(0deg)"; // Landscape by default
        }
      } else {
        document.exitFullscreen().catch(err => console.error("Exit fullscreen error:", err));
        player.style.transform = "rotate(0deg)"; // Reset rotation
      }
    };

    playerRef.current.on("fullscreenchange", toggleFullscreen);

    // ✅ Gesture Controls
    const videoContainer = videoRef.current.parentElement;

    videoContainer.addEventListener("touchstart", (event) => {
      const touch = event.touches[0];
      const rect = videoContainer.getBoundingClientRect();
      const tapY = touch.clientY - rect.top;
      const videoHeight = rect.height;

      if (tapY > videoHeight - 50) return;

      holdTimer.current = setTimeout(() => {
        playerRef.current.playbackRate(2);
      }, 600);
    });

    videoContainer.addEventListener("touchend", (event) => {
      clearTimeout(holdTimer.current);
      playerRef.current.playbackRate(1);

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

    // ✅ Cleanup function
    return () => {
      window.removeEventListener("resize", updateOrientation);
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [m3u8Url, isLive, isPortrait]);

  return (
    <div>
      <h2>
        {isLive ? "🔴 Live Class" : `Now Playing: ${chapterName} - ${lectureName || "Unknown Lecture"}`}
      </h2>
      <video ref={videoRef} className="video-js vjs-default-skin custom-video-player" />
    </div>
  );
};

export default VideoPlayer;
