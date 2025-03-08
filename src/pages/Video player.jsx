import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Hls from "hls.js";
import "../styles/global.css";

const VideoPlayer = () => {
  const { chapter } = useParams();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const m3u8Url = decodeURIComponent(chapter); // Get the M3U8 link from URL

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(m3u8Url);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = m3u8Url;
    }
  }, [chapter]);

  return (
    <div className="video-container">
      <video ref={videoRef} controls className="custom-video-player"></video>
    </div>
  );
};

export default VideoPlayer;