import React from 'react';
import logo from '../Assets/logo.png';
import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
      <div className="navigation-container">
        <div className="logo">
          <img src={logo} onClick={() => window.location.reload()}></img>
        </div>
        <div className="navigation">

          <NavLink to="/" id="home-tab" className="link" activeClassName="activelink">
          <button>Home</button>
          </ NavLink>

          <NavLink to="/miner" id="miner-tab" className="link" activeClassName="activelink">
          <button>Miner</button>
          </ NavLink>

          <NavLink to="/user" id="user-tab" className="link" activeClassName="activelink">
          <button>User</button>
          </ NavLink>

        </div>
      </div>
    );
  }
  
  export default NavBar;