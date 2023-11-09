import React from "react";
import { Link } from "react-router-dom";
// import "./Home.scss";
// import FITNESS from "../../assets/images/women-fitness.png"
import BG from "../../assets/images/bg-mobile.png";

const Home: React.FC = () => {
  return (
    // <div className="home" style={{ backgroundImage: `url(${BG})`}}>
    <div>
      <h1 className="home__title">Tabata Timer</h1>
      <Link to="/create-session" className="home__button">
        Créer une séance d'entaînement {">>>"}
      </Link>
    </div>
  );
};

export default Home;
