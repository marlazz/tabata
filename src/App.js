import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import "./App.scss";
import BG from "./assets/images/bg-mobile.png";
import ExerciceList from "./pages/create-session/CreateSession.tsx";
import SessionPage from "./pages/session/SessionPage.tsx";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-session" element={<ExerciceList />} />
          <Route path="/session" element={<SessionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
