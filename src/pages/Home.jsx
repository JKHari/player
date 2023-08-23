import React, { useState, useEffect } from "react";
import data from "./manifest";

const Home = () => {
  // constructor(props) {
  //   super(props);

  //   this.openSong = {isOpen: false};
  // }
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [selectSong, setSelectedSong] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentAudioIndex, setCurrentAudioIndex] = useState(null);
  const [playStatus, setPlayStatus] = useState(Array(data.length).fill(false));
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [wasPlaying, setWasPlaying] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  // handle on the song paly

  const handleOpenButton = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(!isOpen);
    setSelectedSong(null); // Reset the selected song when closing the popup
  };

  // const handleCloseButton = () => {
  //   alert("ok");
  //   setIsOpen(isOpen);
  // };

  // const IsPlaySong = () => {
  //   setPlayStatus(!isPlay);
  // };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const PlaySongPopup = (id) => {
    setSelectedSong(id);
  };

  useEffect(() => {
    const handleTimeUpdate = (e) => {
      if (!seeking) {
        setAudioCurrentTime(e.target.currentTime);
      }
    };

    if (currentAudioIndex !== null) {
      const audioElement = document.getElementById(
        `audio_${currentAudioIndex}`
      );

      if (audioElement) {
        audioElement.addEventListener("timeupdate", handleTimeUpdate);
        setAudioDuration(audioElement.duration);

        return () => {
          audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        };
      }
    }
  }, [currentAudioIndex, seeking]);

  // const handleIconClick = (id) => {
  //   // Call your other function here
  //   // For example: IsPlaySong(id);
  //   handlePlayClick(id); // Call the play/pause function
  //   // Call your other function here
  // };

  const handlePlayClick = (id) => {
    const audioElement = document.getElementById(`audio_${id}`);
    setIsPlay(!isPlay);

    if (audioElement) {
      if (currentAudioIndex !== null && currentAudioIndex !== id) {
        const currentAudioElement = document.getElementById(
          `audio_${currentAudioIndex}`
        );
        currentAudioElement.pause();
        currentAudioElement.load();
        setPlayStatus((prevStatus) =>
          prevStatus.map((status, i) =>
            i === currentAudioIndex ? false : status
          )
        );
      }

      if (audioElement.paused) {
        audioElement.play().catch((error) => {
          console.error("Playback failed:", error);
        });
        setPlayStatus((prevStatus) =>
          prevStatus.map((status, i) => (i === id ? true : status))
        );
      } else {
        audioElement.pause();
        setPlayStatus((prevStatus) =>
          prevStatus.map((status, i) => (i === id ? false : status))
        );
      }

      setCurrentAudioIndex(audioElement.paused ? null : id);
    }
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

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="bg-[#121212] ">
      {selectSong === null ? (
        <div>
          <div className="flex justify-between mx-5 items-center">
            <h1 className="text-white py-5 font-bold text-2xl">
              Enjoy The Music
            </h1>
            <input
              type="search"
              placeholder="Search"
              className="bg-black h-10 w-[220px] text-gray-400 px-3 rounded-lg outline outline-offset-2 outline-1 hover:outline-green-500"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
          <div
            className=" bg-gradient-to-r from-[#181818] to-[#212121] w-full px-8 py-10 flex gap-6 flex-wrap"
            onClick={handleOpenButton}
          >
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div
                  key={item.id}
                  className={`relative mb-5 hover:shadow-xl cursor-pointer ${
                    playStatus[item.id] ? "playing" : ""
                  }`}
                  onClick={() => PlaySongPopup(item.id)}
                >
                  {playStatus[item.id] && (
                    <img
                      src="./playgif.gif"
                      className="h-20 w-20 absolute top-1/2 mt-10 right-[5px]"
                      alt="Playing"
                    />
                  )}
                  <div className="w-[200px] h-auto bg-[#181818] hover:bg-[#212121] p-3 flex flex-col justify-center items-center flex-wrap rounded-lg ">
                    <img
                      src={item.img}
                      alt=""
                      className="w-[180px] h-[180px] object-cover rounded-lg"
                    />
                    <div className="w-full flex flex-col justify-start items-start pl-3">
                      <p className="text-white/90 pt-2 truncate hover:text-clip w-full  flex justify-start text-md font-medium">
                        {item.name}
                      </p>
                      <p className="text-[#a7a7a7] pt-2 text-sm">
                        {item.author}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="w-full h-screen justify-center items-center text-white text-3xl">
                No Song here...😅
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-[#121212] ">
          <div className=" bg-gradient-to-r from-[#181818] to-[#212121] pt-5 px-8  h-screen ">
            {/* <button onClick={handleClose}>Close</button> */}
            <div onClick={handleClose} className="cursor-pointer p-2">
              <img src="/back.png" alt="" className="w-8 h-8" />
            </div>
            <div className="pt-10">
              {data
                .filter((item) => item.id === selectSong)
                .map((item) => (
                  <div key={item.id}>
                    <div className="flex items-end">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-64 h-64 rounded-lg object-cover"
                      />
                      <div className="pl-10 flex flex-col items-start ">
                        <h2 className="text-white text-4xl pb-5 font-semibold	">
                          {item.name}
                        </h2>
                        <p className="text-white text-lg font-medium">
                          {item.author}
                        </p>
                      </div>
                    </div>
                    <div className="w-full  ">
                      <div className="flex gap-4 items-center">
                        <div>
                          {isPlay ? (
                            <img
                              src="/play.svg"
                              alt=""
                              className="w-[100px] h-[100px] cursor-pointer"
                              onClick={() => handlePlayClick(item.id)}
                            />
                          ) : (
                            <div className="w-[100px] h-[100px] cursor-pointer flex justify-center items-center">
                              <img
                                src="/pause.png"
                                alt=""
                                className="w-[50px] h-[50px] cursor-pointer rounded-full object-cover"
                                onClick={() => handlePlayClick(item.id)}
                              />
                            </div>
                          )}
                        </div>
                        <img
                          src={
                            isHeartFilled ? "/redheart.png" : "/whiteheart1.png"
                          }
                          alt=""
                          className="w-[40px] h-[40px] cursor-pointer"
                          onClick={handleHeartClick}
                        />
                      </div>
                      <audio id={`audio_${item.id}`} className="hidden">
                        <source src={item.song} />
                      </audio>

                      {/* <img src="/musicplaygif.gif" alt="" className="w-4 h-4" /> */}
                      <div className="mt-10 ">
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
                            className={`h-full bg-gradient-to-r from-green-500 to-[#00bb44]  ${
                              playStatus[item.id]
                                ? "transition-width duration-300"
                                : ""
                            }`}
                            style={{
                              width: `${audioProgress}%`,
                              transitionProperty: playStatus[item.id]
                                ? "width"
                                : "",
                            }}
                          ></div>
                        </div>

                        <div className="flex justify-between text-white mt-1">
                          <p>{formatTime(audioCurrentTime)}</p>
                          <p>{formatTime(audioDuration)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
