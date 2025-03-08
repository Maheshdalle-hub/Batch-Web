import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-hls-quality-selector"; // ✅ Quality selection
import "videojs-overlay"; // ✅ Built-in Video.js overlay support
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

      // ✅ Enable Play/Pause Overlay with Video.js Overlay Plugin
      playerRef.current.overlay({
        content: '<button class="vjs-big-play-button"></button>', // ✅ Uses Video.js default big play button
        overlays: [
          {
            start: "pause",
            end: "play",
            align: "center",
          },
        ],
      });

      // ✅ Double Tap to Seek
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
    <div className="video-container">
      <h2>Now Playing: {chapterName || "Unknown Chapter"}</h2>
      <div className="video-wrapper">
        <video ref={videoRef} className="video-js vjs-default-skin custom-video-player" />
      </div>
    </div>
  );
};

export default VideoPlayer;
