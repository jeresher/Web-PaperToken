import React, { useEffect, useState } from 'react';

function Wallet() {

  let [wallet, setWallet] = useState(null);

  function retrieveWalletInfo() {
    fetch(`${document.location.origin}/api/wallet-info`)
    .then(res => res.json())
    .then(result => setWallet(result))
    .catch(err => console.log(err))
  }

  useEffect(() => retrieveWalletInfo(), [])

  return (
    <div className="wallet-container">
      <h1>Your Wallet</h1>
      <div className="wallet-info">         
        <div className="wallet-box">
          <h4>Balance</h4>
          <h6>{wallet ? wallet.balance : ""}</h6>
        </div>  
        <div className="wallet-box">
          <h4>Public Key</h4>
          <textarea 
            className="address"
            value={wallet ? wallet.address : ""}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Wallet;