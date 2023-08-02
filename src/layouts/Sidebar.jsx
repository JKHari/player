import React from "react";
// import './Sidebar.css';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[350px] bg-[#121212] text-start pl-5 py-3">
      <ul className="text-white pt-5">
        <li>
          <div>
            <img src="" alt="" />
            <Link to="/">Home</Link>
          </div>
        </li>
        <li>
          <Link to="/about">Search</Link>
        </li>
        {/* ... */}
      </ul>
    </div>
  );
};

export default Sidebar;
