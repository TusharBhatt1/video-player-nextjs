import React from 'react'
import { FaCompress, FaExpand } from 'react-icons/fa';
interface FullScreenProps {
    currentTime: string;
    duration: string;
    playbackSpeed: number;
    isFullscreen: boolean;
    changePlaybackSpeed: () => void;
    toggleMiniPlayerMode: () => void;
    toggleFullscreenMode: () => void;
  }
export default function FullScreen({
    currentTime,
    duration,
    playbackSpeed,
    isFullscreen,
    changePlaybackSpeed,
    toggleMiniPlayerMode,
    toggleFullscreenMode
}:FullScreenProps) {
  return (
    <>
    <div className="duration-container">
    <div className="current-time">{currentTime}</div>
    <div className="total-time">{duration}</div>
  </div>

  <button
    className="speed-btn wide-btn"
    onClick={changePlaybackSpeed}
  >
    {playbackSpeed}x
  </button>
  <button
    className="mini-player-btn"
    onClick={toggleMiniPlayerMode}
  >
    <svg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
      />
    </svg>
  </button>

  <button
    className="full-screen-btn"
    onClick={toggleFullscreenMode}
  >
    {isFullscreen ? <FaCompress /> : <FaExpand />}
  </button>
  </>
  )
}
