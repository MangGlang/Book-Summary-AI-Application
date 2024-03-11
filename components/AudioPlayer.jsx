import React, { useEffect, useRef, useState } from "react";

import { MdTimer10 } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";

const AudioPlayer = ({ audioSrc, bookData }) => {
  // Manage player's status and current time
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  let isMounted = true;

  const handleForwards = () => {
    // Forward --> +10 seconds
    audioRef.current.currentTime += 10;
  };
  const handleBackwards = () => {
    // Backwards --> -10 seconds
    audioRef.current.currentTime -= 10;
  };

  //   Function to seek to a specific time in the audio.
  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  //   function to update the current time and duration of the audio.
  const handleTimeUpdate = () => {
    if (isMounted) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  //   function to handle playing the audio.
  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  // function to handle pausing the audio.
  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  //   Function to toggle between play and pause state.
  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  //   function to format the duration of the audio in 'mm:ss' format.
  function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  }

  //   Use an effect to listen for 'timeupdate' events from the audio element and update the UI.
  useEffect(() => {

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      isMounted = false;
    };
  });

  // class names for styling buttons
  const buttonStyle =
    "text-white mx-6 text-5xl hover:scale-110 duration-300 ease-in-out";

  return (
    <div className="flex mx-auto items-center w-[100%]">
      <div className="flex w-[33%]">
        <figure>
          {/* TODO: for breakpoint 768, add padding space to bottom of page to revamp audio-player spacing*/}
          <img
            className="max-w-none"
            src={bookData.imageLink}
            width={48}
            height={48}
            alt=""
          />
        </figure>
        <div className="flex-row pl-3">
          <div className="text-white font-sans text-sm font-semibold">
            {bookData.title}
          </div>
          <div className="text-[#bac8ce] text-sm font-sans font-semibold">
            {bookData.author}
          </div>
        </div>
      </div>
      <div className="flex mx-auto items-center justify-center w-[33%]">
        <button
          onClick={handleBackwards}
          className="flex text-2xl text-white hover:scale-110 duration-300 ease-in-out"
        >
          <FaChevronLeft />
          <MdTimer10 />
        </button>

        <button onClick={handlePlayPause}>
          <span>
            {isPlaying ? (
              <FaPauseCircle className={buttonStyle} />
            ) : (
              <FaPlayCircle className={buttonStyle} />
            )}
          </span>
        </button>

        <button
          onClick={handleForwards}
          className="flex text-2xl text-white hover:scale-110 duration-300 ease-in-out"
        >
          <MdTimer10 />
          <FaChevronRight />
        </button>
      </div>

      {/* Input range  for seeking within the audio track. */}

      {/* Audio Player */}
      <div className="flex items-center w-[33%]">
        <p className="text-sm text-white text-left mx-4">
          {formatDuration(currentTime)}
        </p>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />

        {/* Display current & total duration of the track. */}
        <div className="flex mx-auto items-center mr-48">
          <div className="track-duration flex">
            {/* The <audio> element for playing the audio. */}
            <audio ref={audioRef} src={audioSrc} />
            <p className="text-sm text-white mx-4">
              {formatDuration(duration)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
