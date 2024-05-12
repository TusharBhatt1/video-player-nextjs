//@ts-nocheck
"use client";
import React, { useState, useRef, useEffect } from "react";
import { files } from "../../../public/data/medias";
import videoPlayerStore from "../../Zustand/usePlayerStore";
import ForwPlayBackBtns from "./ForwPlayBackBtns";
import VolumeBtns from "./VolumeBtns";
import FullScreen from "./FullScreen";
import { CgSpinner } from "react-icons/cg";
import { formatDuration } from "@/app/function/formatDuration";
export default function Player() {
  const [loading, setIsLoading] = useState(false);
  const { currentVideoId, setCurrentVideoId } = videoPlayerStore();
  const [showControls, setShowControls] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState<number | string>(1);
  const [showVolume, setShowVolume] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0.0);
  const [duration, setDuration] = useState(0);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    setDuration(formatDuration(video.duration));
    setCurrentTime(video.currentTime);
    setIsPlaying(false);
    const handleLoadedMetadata = () => {
      setDuration(formatDuration(video.duration));
      setCurrentTime(video.currentTime);
      setShowControls(true);
      setIsPlaying(true);
    };
    video?.addEventListener("loadedmetadata", handleLoadedMetadata);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const tagName = document?.activeElement?.tagName.toLowerCase();

      if (tagName === "input") return;
      switch (e.key.toLowerCase()) {
        case "escape":
          (function () {
            // document.exitFullscreen();
            videoContainerRef.current?.classList.remove("full-screen");
            setIsFullscreen(false);
            console.log("escaped");
          })();
          break;
        case " ":
        case "k":
          setIsPlaying((prevIsPlaying) => {
            prevIsPlaying
              ? videoRef?.current?.pause()
              : videoRef?.current?.play();
            return !prevIsPlaying;
          });
          break;
        case "f":
          toggleFullscreenMode();
          break;
        case "i":
          toggleMiniPlayerMode();
          break;
        case "m":
          toggleMute();
          break;
        case "n":
          if (currentVideoId <= files.length - 2) {
            setCurrentVideoId(currentVideoId + 1);
          }
          break;
        case "p":
          if (currentVideoId > 0) {
            setCurrentVideoId(currentVideoId - 1);
          }
          break;
        case "arrowleft":
          skip(-5);
          break;
        case "arrowright":
          skip(5);
          break;
        case "arrowup":
          toggleVolume(videoRef.current?.volume + 0.2);
          break;
        case "arrowdown":
          toggleVolume(videoRef.current?.volume - 0.2);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      video?.removeEventListener("loadedmetadata", handleLoadedMetadata);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentVideoId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTime == videoRef?.current?.totalDuration) return;

      const percent: any =
        videoRef?.current?.currentTime / videoRef?.current?.duration;

      timelineContainerRef.current.style.setProperty(
        "--progress-position",
        percent
      );

      setCurrentTime(formatDuration(videoRef?.current?.currentTime));
    }, 1000);
    //@ts-ignore
    if (currentTime == videoRef?.current?.totalDuration)
      return clearInterval(interval);
  }, [currentVideoId]);
  useEffect(() => {
    if (loading) setIsLoading(false);

    if (currentTime == duration || currentTime == 0 || currentTime === "0:00")
      setShowControls(true);
    if (currentTime == duration) setIsPlaying(false);
  }, [currentTime]);

  const togglePlay = () => {
    isPlaying ? videoRef?.current?.pause() : videoRef?.current?.play();
    setIsPlaying((prevState) => !prevState);
  };

  const toggleMute = () => {
    setIsMuted((prevState) => !prevState);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const toggleMiniPlayerMode = () => {
    videoRef?.current?.requestPictureInPicture();
  };

  const toggleVolume = (e: React.ChangeEvent<HTMLInputElement> | number) => {
    let newVolume: any;
    if (typeof e === "number") {
      console.log("received " + e);
      if (e < 0) newVolume = 0;
      else if (e > 1) newVolume = 1;
      else newVolume = e;
    } else newVolume = e.target.value;
    console.log(newVolume);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }

    if (newVolume == 0) setIsMuted(true);
    else setIsMuted(false);
  };
  const skip = (duration: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += duration;
      //@ts-ignore
      setCurrentTime(formatDuration(videoRef.current.currentTime));
      const percent = videoRef.current.currentTime / videoRef.current.duration;
      if (timelineContainerRef.current) {
        timelineContainerRef.current.style.setProperty(
          "--progress-position",
          `${percent * 100}%`
        );
      }
    }
  };

  const handleTimelineUpdate = (e: React.MouseEvent<HTMLDivElement>) => {
    if (timelineContainerRef.current && videoRef.current) {
      const rect = timelineContainerRef.current.getBoundingClientRect();

      const percent =
        Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;

      videoRef.current.currentTime = percent * videoRef.current.duration;
      console.log(percent);
      //@ts-ignore
      setCurrentTime(formatDuration(videoRef.current.currentTime));
    }
  };

  const changePlaybackSpeed = () => {
    if (videoRef.current) {
      let newPlaybackRate = videoRef.current.playbackRate + 0.5;
      if (newPlaybackRate > 2) newPlaybackRate = 0.5;
      videoRef.current.playbackRate = newPlaybackRate;
      setPlaybackSpeed(newPlaybackRate);
    }
  };

  const toggleFullscreenMode = () => {
    if (!isFullscreen) {
      videoContainerRef?.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      className="video-container"
      ref={videoContainerRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="video-container paused" data-volume-level="high">
        <img className="thumbnail-img" />
        <div className="video-controls-container">
          <div
            className="timeline-container"
            ref={timelineContainerRef}
            onClick={handleTimelineUpdate}
          >
            {showControls && (
              <div className="timeline" data-testid="timeline">
                <div className="thumb-indicator"></div>
              </div>
            )}
          </div>
          {showControls && (
            <div data-testid="controls" className="controls">
              <ForwPlayBackBtns
                currentVideoId={currentVideoId}
                setCurrentVideoId={setCurrentVideoId}
                togglePlay={togglePlay}
                isPlaying={isPlaying}
              />
              <div
                className="volume-container"
                onMouseEnter={() => setShowVolume(true)}
                onMouseLeave={() => setShowVolume(false)}
              >
                <VolumeBtns
                  toggleMute={toggleMute}
                  toggleVolume={toggleVolume}
                  isMuted={isMuted}
                  volume={volume}
                  showVolume={showVolume}
                />
              </div>

              <FullScreen
                isFullscreen={isFullscreen}
                toggleFullscreenMode={toggleFullscreenMode}
                toggleMiniPlayerMode={toggleMiniPlayerMode}
                currentTime={currentTime}
                duration={duration}
                playbackSpeed={playbackSpeed}
                changePlaybackSpeed={changePlaybackSpeed}
              />
            </div>
          )}
        </div>
        {loading && (
          <div className="w-full bg-gray-100 bg-opacity-70 absolute h-full  flex justify-center items-center">
            <CgSpinner size={32} className="animate-spin " />
          </div>
        )}
        <video
          data-testid="video"
          ref={videoRef}
          autoPlay
          onClick={togglePlay}
          src={files[currentVideoId].url}
          type="video/mp4"
          onWaiting={() => setIsLoading(true)}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
