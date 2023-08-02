import React from "react";
// import {image} from '../../public/image.jpg'

const Home = () => {
  return (
    <div className="bg-[#121212] h-screen">
      <h1 className="text-white py-5 font-bold text-2xl">Enjoy The Music</h1>
      <div className="bg-[#1e1e1e] w-full px-8 py-10">
        <div>
          <div className="w-[200px] h-auto bg-[#121212] p-1 flex flex-col justify-center items-center flex-wrap">
            <img src="" alt="" className="w-[180px] h-[180px]" />
            <p className="text-white pt-2">Motivation Song</p>
            <p className="text-white pt-2">Hip Hop Tamiza</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
