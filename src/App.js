// import logo from "./logo.svg";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <h1>Happy Hacking</h1>
//       <h1>Music Player</h1>
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import './App.css';
// import Sidebar from './layouts/Sidebar';

// function App() {
//   return (
//     <div className="App">
//       <Sidebar />
//       <main className="content">
//         {/* Your main content goes here */}
//       </main>
//     </div>
//   );
// }

// export default App;

// src/App.js
// import React from 'react';
// import './App.css';
// import Sidebar from './layouts/Sidebar';
// import Home from './pages/Home'; // Import the Home component

// function App() {
//   return (
//     <div className="App">
//       <Sidebar />
//       <main className="content">
//         <Home /> {/* Display the Home component */}
//       </main>
//     </div>
//   );
// }

// export default App;

// src/App.js
// import React from 'react';
// import './App.css';
// import Sidebar from './layouts/Sidebar';
// import Home from './pages/Home';
// import About from './pages/About'; // Import the About component
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Sidebar />
//         <main className="content">
//           <Switch>
//             <Route path="/" exact component={Home} />
//             <Route path="/about" component={About} /> {/* Add the route */}
//           </Switch>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;

// src/App.js
// import React from 'react';
// import './App.css';
// import Sidebar from './layouts/Sidebar';
// import Home from './pages/Home';
// import About from './pages/About';
// import { BrowserRouter as Router, Route } from 'react-router-dom'; // Import BrowserRouter and Route

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Sidebar />
//         <main className="content">
//           <Route path="/" exact component={Home} />
//           <Route path="/about" component={About} />
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;


// src/App.js
import React from 'react';
import './App.css';
import Sidebar from './layouts/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
