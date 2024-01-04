import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home: React.FC = () => {
  return (
    <div className="home">
        <h1 className="home__title">Fitness<span className="home__title--accent">X</span></h1>
      <Link to="/create-session" className="home__button">
        Créer une séance
      </Link>
    </div>
  );
};

export default Home;
