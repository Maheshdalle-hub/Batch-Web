import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-hls-quality-selector"; // ✅ Quality selection
import { useLocation } from "react-router-dom";

const VideoPlayer = () => {
  const location = useLocation();
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  // Get M3U8 link from Lectures.jsx
  const { chapterName, m3u8Url } = location.state || {};

  useEffect(() => {
    if (videoRef.current && m3u8Url) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        fluid: true,
        playbackRates: [0.5, 1, 1.5, 2], // ✅ Speed control
      });

      playerRef.current.src({ src: m3u8Url, type: "application/x-mpegURL" });

      // ✅ Enable quality selection
      playerRef.current.ready(() => {
        if (playerRef.current.hlsQualitySelector) {
          playerRef.current.hlsQualitySelector({ displayCurrentQuality: true });
        }
      });

      // ✅ Handle Fullscreen Rotation
      playerRef.current.on("fullscreenchange", () => {
        if (playerRef.current.isFullscreen()) {
          screen.orientation.lock("landscape").catch(() => {});
        } else {
          screen.orientation.unlock();
        }
      });

      // ✅ Add Double Tap to Seek Feature
      const videoContainer = videoRef.current.parentElement;

      let lastTap = 0;
      videoContainer.addEventListener("click", (event) => {
        const currentTime = new Date().getTime();
        const tapGap = currentTime - lastTap;

        if (tapGap < 300) {
          // Double Tap Detected
          const rect = videoContainer.getBoundingClientRect();
          const tapX = event.clientX - rect.left;
          const videoWidth = rect.width;

          if (tapX < videoWidth / 2) {
            playerRef.current.currentTime(playerRef.current.currentTime() - 10); // ⏪ Skip Back
          } else {
            playerRef.current.currentTime(playerRef.current.currentTime() + 10); // ⏩ Skip Forward
          }
        }
        lastTap = currentTime;
      });

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, [m3u8Url]);

  return (
    <div>
      <h2>Now Playing: {chapterName || "Unknown Chapter"}</h2>
      <video ref={videoRef} className="video-js vjs-default-skin custom-video-player" />
    </div>
  );
};

export default VideoPlayer;
