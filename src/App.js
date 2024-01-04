import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import "./App.scss";
import SessionPage from "./pages/session/SessionPage.tsx";
import CreateSessionPage from "./pages/create-session/CreateSessionPage.tsx";
import "../src/styles/global.scss";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-session" element={<CreateSessionPage />} />
          <Route path="/session" element={<SessionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
