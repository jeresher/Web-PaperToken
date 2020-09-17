import React from 'react';
import logo from '../Assets/logo2.png';
import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
      <div className="navigation-container">

        <div className="logo">

          <img src={logo} onClick={() => window.location.reload()}></img>

        </div>

        <div className="navigation">

          <NavLink to="/" id="home-tab" className="link" activeClassName="activelink" exact>
          <button>Home</button>
          </ NavLink>

          <NavLink to="/miner" id="miner-tab" className="link" activeClassName="activelink" exact>
          <button>Miner</button>
          </ NavLink>

          <NavLink to="/user" id="user-tab" className="link" activeClassName="activelink" exact>
          <button>User</button>
          </ NavLink>


        </div>

        <div>

        </div>

      </div>
    );
  }
  
  export default NavBar;