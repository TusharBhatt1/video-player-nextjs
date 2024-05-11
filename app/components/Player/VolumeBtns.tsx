import React from "react";
import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

interface VolumeBtnsType {
  toggleMute: () => void;
  toggleVolume: (e:React.ChangeEvent<HTMLInputElement>) => void;
  isMuted: boolean;
  volume: number;
  showVolume: boolean;
}
export default function VolumeBtns({
  toggleMute,
  toggleVolume,
  isMuted,
  volume,
  showVolume,
}: VolumeBtnsType) {
  return (
    <>
      <button className="mute-btn" onClick={toggleMute}>
        {isMuted ? (
          <FaVolumeMute />
        ) : volume > 0.5 ? (
          <FaVolumeUp />
        ) : (
          <FaVolumeDown />
        )}
      </button>
      <input
        disabled={!showVolume}
        className="volume-slider"
        type="range"
        min="0"
        max="1"
        step="any"
        value={volume}
        onChange={toggleVolume}
      />
    </>
  );
}
