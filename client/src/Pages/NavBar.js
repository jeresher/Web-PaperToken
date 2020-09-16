import React from 'react';

function NavBar() {
    return (
      <div className="navigation-container">
        <div className="logo">
          <h1>Paper Token</h1>
        </div>
        <div className="navigation">
          <button>Home</button>
          <button>Miner</button>
          <button>User</button>
        </div>
      </div>
    );
  }
  
  export default NavBar;