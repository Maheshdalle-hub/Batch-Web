import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Hls from "hls.js";
import "../styles/global.css";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [hls, setHls] = useState(null);
  const [qualityLevels, setQualityLevels] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState("auto");
  const doubleTapRef = useRef({ lastTap: 0 });

  // Get data passed from Lectures.jsx
  const location = useLocation();
  const { chapterName, m3u8Url } = location.state || {};

  useEffect(() => {
    if (videoRef.current && m3u8Url) {
      if (Hls.isSupported()) {
        const hlsInstance = new Hls();
        hlsInstance.loadSource(m3u8Url);
        hlsInstance.attachMedia(videoRef.current);
        setHls(hlsInstance);

        hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
          setQualityLevels(hlsInstance.levels);
        });

        return () => {
          hlsInstance.destroy();
        };
      } else {
        videoRef.current.src = m3u8Url;
      }
    }
  }, [m3u8Url]);

  const handleQualityChange = (level) => {
    if (hls) {
      hls.currentLevel = level;
      setSelectedQuality(level === -1 ? "auto" : `Quality ${level + 1}`);
    }
  };

  const handleDoubleTap = (direction) => {
    const now = Date.now();
    if (now - doubleTapRef.current.lastTap < 300) {
      if (videoRef.current) {
        videoRef.current.currentTime += direction === "forward" ? 10 : -10;
      }
    }
    doubleTapRef.current.lastTap = now;
  };

  const handleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };

  return (
    <div className="video-container">
      <h2>{chapterName}</h2>
      <div className="video-wrapper">
        <video
          ref={videoRef}
          controls
          className="video-player"
          onDoubleClick={(e) =>
            handleDoubleTap(e.clientX > window.innerWidth / 2 ? "forward" : "backward")
          }
        />
        <button className="fullscreen-btn" onClick={handleFullscreen}>⛶</button>
      </div>

      <div className="quality-controls">
        <label>Quality: </label>
        <select onChange={(e) => handleQualityChange(parseInt(e.target.value, 10))}>
          <option value="-1">Auto</option>
          {qualityLevels.map((level, index) => (
            <option key={index} value={index}>
              {`Quality ${index + 1}`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VideoPlayer;
