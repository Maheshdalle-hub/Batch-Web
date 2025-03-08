import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-hls-quality-selector"; // ✅ Quality selection
import { useLocation } from "react-router-dom";

const VideoPlayer = () => {
  const location = useLocation();
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

      // ✅ Update Play/Pause State
      playerRef.current.on("play", () => setIsPlaying(true));
      playerRef.current.on("pause", () => setIsPlaying(false));

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, [m3u8Url]);

  // ✅ Double Tap to Seek (Works on Mobile)
  const handleDoubleTap = (event) => {
    const rect = videoRef.current.getBoundingClientRect();
    const tapX = event.clientX - rect.left;
    const videoWidth = rect.width;

    if (tapX < videoWidth / 2) {
      playerRef.current.currentTime(playerRef.current.currentTime() - 10); // ⏪ Skip Back
    } else {
      playerRef.current.currentTime(playerRef.current.currentTime() + 10); // ⏩ Skip Forward
    }
  };

  return (
    <div className="video-container">
      <h2>Now Playing: {chapterName || "Unknown Chapter"}</h2>

      {/* Video Wrapper */}
      <div
        className="video-wrapper"
        onDoubleClick={handleDoubleTap} // ✅ Double Tap to Seek
      >
        <video ref={videoRef} className="video-js vjs-default-skin custom-video-player" />

        {/* ✅ Center Play/Pause Button */}
        <button
          className="play-pause-overlay"
          onClick={() => (isPlaying ? playerRef.current.pause() : playerRef.current.play())}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
