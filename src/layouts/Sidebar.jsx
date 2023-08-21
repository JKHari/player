import React from "react";
// import './Sidebar.css';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[350px] bg-black text-start pl-5 py-3">
      <ul className="text-white pt-5 ml-2 bg-[#121212]">
        <li className="py-3">
          <div>
            <img src="" alt="" />
            <Link to="/">Home</Link>
          </div>
        </li>
        {/* <li className="py-3">
          <Link to="/search">Search</Link>
        </li> */}
        <li className="py-3">
          <Link to="/playlist">PlayList</Link>
        </li>
        {/* ... */}
      </ul>
    </div>
  );
};

export default Sidebar;
