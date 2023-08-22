import React from "react";
// import './Sidebar.css';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[350px] bg-black text-start px-5 py-3 ">
      <div>
        <ul className="text-white pt-5 ml-2 bg-[#121212] w-[220px] fixed  mx-3 rounded-lg flex flex-col justify-center items-start pl-5 py-5">
          <li className="pb-4 ">
            <div className="flex gap-3 justify-center items-center">
              <img src="/search1.png" alt="" className="h-5 w-5" />
              <Link to="/" className="hover:text-green-300">
                Home
              </Link>
            </div>
          </li>
          <li className="pb-3">
            <div className="flex gap-3 justify-center items-center">
              <img src="/playlist1.png" alt="" className="h-5 w-5" />
              <Link to="/playlist" className="hover:text-green-300">
                PlayList
              </Link>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex flex-col justify-start w-[220px] h-auto mt-[600px] fixed items-start pl-3">
        <h1 className="italic text-green-400">Play Song...🎶 </h1>
        <h1 className="text-green-400 italic">Feel Free ❤️ </h1>
      </div>
    </div>
  );
};

export default Sidebar;
