import React, { useEffect, useRef } from "react";
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

  const { chapterName, lectureName, m3u8Url } = location.state || {};

  useEffect(() => {
    if (videoRef.current && m3u8Url) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        fluid: true,
        playbackRates: [0.5, 1, 1.5, 2], 
      });

      playerRef.current.src({ src: m3u8Url, type: "application/x-mpegURL" });

      playerRef.current.ready(() => {
        if (playerRef.current.hlsQualitySelector) {
          playerRef.current.hlsQualitySelector({ displayCurrentQuality: true });
        }
      });

      playerRef.current.on("fullscreenchange", () => {
        if (playerRef.current.isFullscreen()) {
          screen.orientation.lock("landscape").catch(() => {});
        } else {
          screen.orientation.unlock();
        }
      });

      // ✅ Gesture Controls (More Accurate)
      const videoContainer = videoRef.current.parentElement;

      videoContainer.addEventListener("touchstart", (event) => {
        const touch = event.touches[0];
        const rect = videoContainer.getBoundingClientRect();
        const tapX = touch.clientX - rect.left;
        const tapY = touch.clientY - rect.top;
        const videoWidth = rect.width;
        const videoHeight = rect.height;

        // ✅ Ignore taps near the bottom (where controls are)
        if (tapY > videoHeight - 50) return;

        // ✅ Hold to speed up
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
        const tapY = touch.clientY - rect.top;
        const videoWidth = rect.width;
        const videoHeight = rect.height;

        // ✅ Ignore taps near controls
        if (tapY > videoHeight - 50) return;

        if (tapGap < 300) {
          if (tapX < videoWidth / 3) {
            playerRef.current.currentTime(playerRef.current.currentTime() - 10);
          } else if (tapX > (2 * videoWidth) / 3) {
            playerRef.current.currentTime(playerRef.current.currentTime() + 10);
          } else {
            if (playerRef.current.paused()) {
              playerRef.current.play();
            } else {
              playerRef.current.pause();
            }
          }
        }
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
      <h2>Now Playing: {chapterName} - {lectureName || "Unknown Lecture"}</h2>
      <video ref={videoRef} className="video-js vjs-default-skin custom-video-player" />
    </div>
  );
};

export default VideoPlayer;
