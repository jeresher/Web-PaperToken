import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Components/Home';
import Miner from '../Components/Miner';
import User from '../Components/User';

function Content() {
    return (
      <div className="content-container">
        <Switch>
          <Route exact path="/miner" component={Miner} />
          <Route exact path="/user" component={User} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
  
  export default Content;