import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import "./App.scss";
import Settings2 from "./pages/settings2/Settings2.tsx";
import BG from "./assets/images/bg-mobile.png";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/settings" element={<Settings2 />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
