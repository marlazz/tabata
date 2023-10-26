import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.scss";
import FITNESS from "../../assets/images/women-fitness.png"
import BG from "../../assets/images/bg-mobile.png";

const Home: React.FC = () => {
  return (
    <div className="home" style={{ backgroundImage: `url(${BG})`}}>
      <h1 className="home__title">Tabata Timer</h1>
      <img 
      src={FITNESS}
      alt="clock"
      className="home__timer-image"
      />
      <Link to="/settings" className="home__button">Let's Start {'>>>'}</Link>
      </div>
  )
}

export default Home;
