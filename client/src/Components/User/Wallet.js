import React, { useEffect } from 'react';

function Wallet() {


  function retrieveWalletInfo() {
    fetch("http://localhost:5000/api/wallet-info")
    .then(res => res.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }

  useEffect(() => retrieveWalletInfo(), [])

  return (
    <div className="wallet-container">
      <h1>Your Wallet</h1>
    </div>
  );
}

export default Wallet;