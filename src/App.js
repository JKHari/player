import React from "react";
import "./App.css";
import Sidebar from "./layouts/Sidebar";
import Home from "./pages/Home";
// import Search from "./pages/Search";
import Playlist from "./pages/Playlist";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, and Route

function App() {
  return (
    <Router>
      <div className="flex text-center">
        <Sidebar />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/search" element={<Search />} /> */}
            <Route path="/playlist" element={<Playlist />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
