import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-hls-quality-selector"; 
import { useLocation, useParams } from "react-router-dom";

const VideoPlayer = () => {
  const location = useLocation();
  const { book, chapterIndex } = useParams();
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const lastTap = useRef(0);
  const holdTimer = useRef(null);

  // ✅ Extract passed state (for both normal videos & live)
  const { chapterName = "Live Class", lectureName, m3u8Url } = location.state || {};

  useEffect(() => {
    if (videoRef.current && m3u8Url) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        fluid: true,
        playbackRates: [ 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2], 
      });

      // ✅ Use the passed M3U8 link (no hardcoded link)
      playerRef.current.src({
        src: m3u8Url,
        type: "application/x-mpegURL",
      });

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

      // ✅ Gesture Controls (Same as before)
      const videoContainer = videoRef.current.parentElement;

      videoContainer.addEventListener("touchstart", (event) => {
        const touch = event.touches[0];
        const rect = videoContainer.getBoundingClientRect();
        const tapX = touch.clientX - rect.left;
        const tapY = touch.clientY - rect.top;
        const videoWidth = rect.width;
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
        const tapY = touch.clientY - rect.top;
        const videoWidth = rect.width;
        const videoHeight = rect.height;

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
      <h2>
        {chapterName} {lectureName ? `- ${lectureName}` : ""}
      </h2>
      <video ref={videoRef} className="video-js vjs-default-skin custom-video-player" />
    </div>
  );
};

export default VideoPlayer;
