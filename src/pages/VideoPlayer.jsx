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

  // ✅ Extract passed state
  const { chapterName, lectureName, m3u8Url } = location.state || {};

  // ✅ Detect if it's a Live Class
  const isLive = location.pathname.includes("/video/live");

  // ✅ Default Live Class URL
  const defaultLiveUrl = "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/4254694/173402301054458296383/173402301054458296383_8296383.m3u8";

  // ✅ Detect device orientation
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

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

    // ✅ Detect phone orientation dynamically
    const updateOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    window.addEventListener("resize", updateOrientation);
    updateOrientation();

    // ✅ Fullscreen mode based on orientation
    playerRef.current.on("fullscreenchange", () => {
      try {
        if (document.fullscreenElement) {
          if (isPortrait) {
            screen.orientation.lock("portrait");
          } else {
            screen.orientation.lock("landscape");
          }
        } else {
          screen.orientation.unlock();
        }
      } catch (error) {
        console.error("Fullscreen error:", error);
      }
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
      window.removeEventListener("resize", updateOrientation);
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
