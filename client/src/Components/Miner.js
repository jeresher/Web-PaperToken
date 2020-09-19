import React from 'react';
import TransactionPool from './Miner/TransactionPool';
import Blockchain from './Miner/Blockchain';

function Miner() {
    return (
      <div className="miner-container">
        <div className="miner-inner-container">
          <TransactionPool />
          <Blockchain />
        </div>
      </div>
    );
  }
  
export default Miner;