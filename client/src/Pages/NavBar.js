import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
      <div className="navigation-container">

        {/* LOGO PLACEHOLDER */}
        <div className="logo">
        </div>

        <div className="navigation">

          <NavLink to="/" id="home-tab" className="link" activeClassName="activelink" exact>
          <button>Home</button>
          </ NavLink>

          <NavLink to="/user" id="user-tab" className="link" activeClassName="activelink" exact>
          <button>User</button>
          </ NavLink>

          <NavLink to="/miner" id="miner-tab" className="link" activeClassName="activelink" exact>
          <button>Miner</button>
          </ NavLink>

        </div>

        {/*SOCIAL MEDIA PLACEHOLDER*/}
        <div className="socialmedia">
        </div>

      </div>
    );
  }
  
  export default NavBar;