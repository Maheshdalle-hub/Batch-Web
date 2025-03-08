import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-http-source-selector"; // ✅ Import quality selector plugin
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
        playbackRates: [0.5, 1, 1.5, 1.75, 2], // ✅ Speed control
      });

      playerRef.current.src({ src: m3u8Url, type: "application/x-mpegURL" });

      // ✅ Enable quality selection plugin
      playerRef.current.ready(() => {
        playerRef.current.httpSourceSelector();
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
      <video ref={videoRef} className="video-js vjs-default-skin" />
    </div>
  );
};

export default VideoPlayer;
