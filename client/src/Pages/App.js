import React from 'react';
import '../Style/App.css';
import NavBar from './NavBar';
import Content from './Content';
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  return (
    <div className="main-container">
      <Router>
        <NavBar />
        <Content />
      </Router>
    </div>
  );
}

export default App;
