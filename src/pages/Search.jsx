import React from "react";
import data from "./manifest";
const Search = () => {
  return (
    <div className="bg-black h-screen">
      <h1>About Us</h1>
      <p>We are a company dedicated to providing...</p>
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
              />
              <audio id={`audio_${index}`} className="hidden">
                <source src={item.song} />
              </audio>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
