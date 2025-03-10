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

      // ✅ Gesture Controls
      const videoContainer = videoRef.current.parentElement;

      let lastTap = 0;
      let holding = false;
      let holdTimer;

      videoContainer.addEventListener("click", (event) => {
        const currentTime = new Date().getTime();
        const tapGap = currentTime - lastTap;

        if (tapGap < 300) {
          // Double Tap Detected
          const rect = videoContainer.getBoundingClientRect();
          const tapX = event.clientX - rect.left;
          const videoWidth = rect.width;

          if (tapX < videoWidth / 3) {
            playerRef.current.currentTime(playerRef.current.currentTime() - 10); // ⏪ Skip Back
          } else if (tapX > (2 * videoWidth) / 3) {
            playerRef.current.currentTime(playerRef.current.currentTime() + 10); // ⏩ Skip Forward
          }
        } else {
          // Single Tap (Play/Pause)
          if (playerRef.current.paused()) {
            playerRef.current.play();
          } else {
            playerRef.current.pause();
          }
        }

        lastTap = currentTime;
      });

      // ✅ Hold Gesture for Speed Control
      videoContainer.addEventListener("mousedown", () => {
        holding = true;
        holdTimer = setTimeout(() => {
          if (holding) {
            playerRef.current.playbackRate(2); // Increase speed while holding
          }
        }, 500);
      });

      videoContainer.addEventListener("mouseup", () => {
        holding = false;
        clearTimeout(holdTimer);
        playerRef.current.playbackRate(1); // Reset speed after release
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
