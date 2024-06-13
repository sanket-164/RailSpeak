/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton, LinearProgress, Slider, Tooltip } from "@mui/material";

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const handlePlaybackRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setPlaybackRate(newRate);
    audioRef.current.playbackRate = newRate;
  };

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    const currentTime = new Date(audioRef.current.currentTime).getTime();
    const maximumTime = new Date(audioRef.current.duration).getTime();
    let progressPercentage = ((currentTime / maximumTime) * 100).toFixed(2);
    progressPercentage = Math.min(Math.max(progressPercentage, 0), 100);
    setCurrentTime(progressPercentage);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div className="audio-player bg-gray-100 rounded-lg p-6 shadow-md">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      Announcement
      <div className="flex items-center justify-between mb-4">
        <div className="controls flex items-center">
          <Tooltip title="Play/Pause" aria-label="Play/Pause">
            <IconButton
              onClick={togglePlayPause}
              className="rounded-full p-3 mr-4"
            >
              {isPlaying ? <StopIcon /> : <PlayArrowIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Restart" aria-label="Restart">
            <IconButton onClick={handleRestart} className="rounded-full p-3">
              <ReplayIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className="current-time text-gray-500">{currentTime}s</div>
      </div>
      <div className="progress">
        <LinearProgress variant="determinate" value={currentTime} />
      </div>
      {/* slider */}
      <div className="mt-6" >
        <span>Playback Rate: {playbackRate}x</span>
        <Slider
          size="small"
          min={0}
          max={2}
          step={0.1}
          aria-label="Small"
          valueLabelDisplay="auto"
          onChange={handlePlaybackRateChange}
          value={playbackRate}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
