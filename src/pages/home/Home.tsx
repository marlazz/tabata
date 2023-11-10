import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1 className="home__title">Tabata Timer</h1>
      <Link to="/create-session" className="home__button">
        Créer une séance d'entaînement {">>>"}
      </Link>
    </div>
  );
};

export default Home;
