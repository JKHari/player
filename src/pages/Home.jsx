import React, { useState, useEffect } from "react";
import data from "./manifest";

const Home = () => {
  // constructor(props) {
  //   super(props);

  //   this.openSong = {isOpen: false};
  // }
  const [isOpen, setIsOpen] = useState(false);
  const [selectSong, setSelectedSong] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentAudioIndex, setCurrentAudioIndex] = useState(null);
  const [playStatus, setPlayStatus] = useState(Array(data.length).fill(false));
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [wasPlaying, setWasPlaying] = useState(false);

  // handle on the song paly

  const handleOpenButton = () => {
    setIsOpen(!isOpen);
  };

  const PlaySongPopup = (id) => {
    alert("hello");
    alert(id);
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

  const handlePlayClick = async (id) => {
    const audioElement = document.getElementById(`audio_${id}`);

    if (audioElement) {
      if (currentAudioIndex !== null && currentAudioIndex !== id) {
        const currentAudioElement = document.getElementById(
          `audio_${currentAudioIndex}`
        );
        await currentAudioElement.pause();
        await currentAudioElement.load();
        setPlayStatus((prevStatus) =>
          prevStatus.map((status, i) =>
            i === currentAudioIndex ? false : status
          )
        );
      }

      if (audioElement.paused) {
        await audioElement.play();
        setPlayStatus((prevStatus) =>
          prevStatus.map((status, i) => (i === id ? true : status))
        );
      } else {
        await audioElement.pause();
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
      <div className="flex justify-between mx-5 items-center">
        <h1 className="text-white py-5 font-bold text-2xl">Enjoy The Music</h1>
        <input
          type="search"
          placeholder="Search"
          className="bg-black h-10 w-[220px] text-gray-400 px-3 rounded-lg outline outline-offset-2 outline-1 hover:outline-green-500"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      {selectSong === null ? (
        <div
          className=" relative bg-gradient-to-r from-[#181818] to-[#212121] w-full px-8 py-10 flex gap-6 flex-wrap"
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
                    <p className="text-[#a7a7a7] pt-2 text-sm">{item.author}</p>
                  </div>
                </div>
                <div className="w-full  ">
                  <img
                    src="/play.svg"
                    alt=""
                    className="absolute w-[100px] h-[100px] mt-[48px]  top-2/4 left-[60%] transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 cursor-pointer"
                    onClick={() => handlePlayClick(item.id)}
                  />
                  <audio id={`audio_${item.id}`} className="hidden">
                    <source src={item.song} />
                  </audio>
                  {playStatus[item.id] && (
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
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="w-full h-screen justify-center items-center text-white text-3xl">
              No Song here...😅
            </p>
          )}
        </div>
      ) : (
        <div className=" relative bg-gradient-to-r from-[#181818] to-[#212121] w-full px-8 py-10 flex gap-6 flex-wrap">
          <div className="absolute w-full h-screen bg-gray-300 top-0 left-0">
            <button onClick={handleOpenButton}>Close</button>
            <div className="text-black">
              {/* Currently Playing Song ID: {selectSong} */}
              {data
                .filter((item) => item.id === selectSong)
                .map((item) => (
                  <div key={item.id}>
                    <img src={item.img} alt={item.name} className="w-64 h-64" />
                    <h2>{item.name}</h2>
                    <p>{item.author}</p>
                    <button onClick={() => handlePlayClick(item.id)}>
                      Play
                    </button>
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
