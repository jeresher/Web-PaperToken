import React, { useEffect } from 'react';

function Home() {

  useEffect(() => {console.log('nice')}, []);

  return (
    <div className="wallet-container">
      <h1 style={{color:'red'}}>Home</h1>
    </div>
  );
}

export default Home;
  
