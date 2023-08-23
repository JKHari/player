import React from "react";

const Playlist = () => {
  return (
    <div className="bg-[#121212] h-screen w-full">
      <div>
        <h1 className="text-white font-mono text-2xl py-5">Your PlayList </h1>
        <div className="w-full flex justify-start mx-5 mt-5">
          <button className="bg-green-400 px-4 py-2 text-white rounded-md hover:bg-green-500  justify-end">
            Crete PlayList
          </button>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
