import React, { useState, useEffect } from "react";
import data from "./manufast";

const Home = () => {
  const [currentAudioIndex, setCurrentAudioIndex] = useState(null);
  const [playStatus, setPlayStatus] = useState(Array(data.length).fill(false));
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [wasPlaying, setWasPlaying] = useState(false);

  useEffect(() => {
    const handleTimeUpdate = (e) => {
      if (!seeking) {
        setAudioCurrentTime(e.target.currentTime);
      }
    };

    const audioElement = document.getElementById(`audio_${currentAudioIndex}`);

    if (audioElement) {
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      setAudioDuration(audioElement.duration);

      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [currentAudioIndex, seeking]);

  const handlePlayClick = (index) => {
    const audioElement = document.getElementById(`audio_${index}`);
    const currentAudioElement = document.getElementById(
      `audio_${currentAudioIndex}`
    );

    if (currentAudioElement && currentAudioElement !== audioElement) {
      currentAudioElement.pause();
      setPlayStatus((prevStatus) =>
        prevStatus.map((status, i) =>
          i === currentAudioIndex ? false : status
        )
      );
    }

    setPlayStatus((prevStatus) =>
      prevStatus.map((status, i) => (i === index ? !status : status))
    );

    if (audioElement) {
      if (audioElement.paused) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }

    setAudioCurrentTime(audioElement.currentTime);
    setCurrentAudioIndex(audioElement.paused ? null : index);
  };

  const startSeek = (event) => {
    const audioElement = document.getElementById(`audio_${currentAudioIndex}`);
    if (audioElement) {
      setWasPlaying(!audioElement.paused);
      setSeeking(true);
    }
  };

  const handleSeek = (event) => {
    event.preventDefault();
    const audioElement = document.getElementById(`audio_${currentAudioIndex}`);
    if (audioElement) {
      const newPosition =
        (event.nativeEvent.offsetX / event.target.offsetWidth) * audioDuration;
      audioElement.currentTime = newPosition;
      setAudioCurrentTime(newPosition);
    }
  };

  const stopSeek = () => {
    setSeeking(false);
    const audioElement = document.getElementById(`audio_${currentAudioIndex}`);
    if (audioElement && wasPlaying) {
      audioElement.play();
    }
  };

  const audioProgress = (audioCurrentTime / audioDuration) * 100;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="bg-[#121212] h-screen">
      <h1 className="text-white py-5 font-bold text-2xl">Enjoy The Music</h1>
      <div className="bg-[#1e1e1e] w-full px-8 py-10 flex gap-6 flex-wrap">
        {data.map((item, index) => (
          <div key={index} className="relative">
            <div className="w-[200px] h-auto bg-[#121212] p-1 flex flex-col justify-center items-center flex-wrap rounded-md ">
              <img src={item.img} alt="" className="w-[180px] h-[180px]" />
              <p className="text-white pt-2">{item.name}</p>
              <p className="text-white pt-2">{item.author}</p>
            </div>
            <div className="absolute w-full h-[120px] mt-16 top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 cursor-pointer bg-black">
              <img
                src="/play.svg"
                alt=""
                className="w-full h-full cursor-pointer"
                onClick={() => handlePlayClick(index)}
              />
              <audio id={`audio_${index}`} className="hidden">
                <source src={item.song} />
              </audio>
              {currentAudioIndex === index && (
                <>
                  <div
                    className="h-2 bg-gray-800 mt-2 rounded-md overflow-hidden"
                    onMouseDown={startSeek}
                    onMouseMove={(e) => {
                      if (seeking) {
                        handleSeek(e);
                      }
                    }}
                    onMouseUp={stopSeek}
                  >
                    <div
                      className={`h-full bg-green-500 ${
                        playStatus[index] ? "transition-width duration-300" : ""
                      }`}
                      style={{
                        width: `${audioProgress}%`,
                        transitionProperty: playStatus[index] ? "width" : "",
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-white mt-1">
                    <p>{formatTime(audioCurrentTime)}</p>
                    <p>{formatTime(audioDuration)}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
