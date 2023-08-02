// import React from 'react';
// import './Sidebar.css'; // Create this CSS file to style your sidebar

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <ul>
//         <li>Home</li>
//         <li>About</li>
//         <li>Services</li>
//         <li>Contact</li>
//       </ul>
//     </div>
//   );
// };
// src/Sidebar.js
// import React from 'react';
// import './Sidebar.css';
// import { Link } from 'react-router-dom';

// const Sidebar = () => {
//   const navigateTo = (page) => {
//     // Implement your navigation logic here
//     // You can use React Router or any other routing library
//   };

//   return (
//     <div className="sidebar">
//       <ul>
//         <li onClick={() => navigateTo('home')}>Home</li>
//         <li onClick={() => navigateTo('about')}>About</li>
//         <li onClick={() => navigateTo('services')}>Services</li>
//         <li onClick={() => navigateTo('contact')}>Contact</li>
//       </ul>
//     </div>
//   );
// };

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About</Link></li>
//         {/* ... */}
//       </ul>
//     </div>
//   );
// };
// export default Sidebar;

// import React from 'react';
// import './Sidebar.css';
// import { Link } from 'react-router-dom';

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About</Link></li>
//         {/* ... */}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


// src/Sidebar.js
import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        {/* ... */}
      </ul>
    </div>
  );
};

export default Sidebar;





