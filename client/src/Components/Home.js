import React, { useEffect } from 'react';
import Background from "../Animation/Background"
import { Link } from 'react-router-dom';

function Home() {

  let background = new Background;

  useEffect(() => background.start(), [])
  useEffect(() => () => background.end(), [])

  return (
    <div className="home-container">
      <h1>Paper<span>Token</span></h1>
      <h3>A full-fledged cryptocurrency and platform designed to <br /> showcase the innerworkings of blockchain technology.</h3>
      <Link to={'/user'}><button>Get Started</button></Link>
    </div>
  );
}

export default Home;
  
