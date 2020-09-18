import React from 'react';
import Wallet from './User/Wallet';
import Transaction from './User/Transaction';
import History from './User/History';
import test from '../Assets/test.svg'

function User() {
    return (
      <div className="user-container">
        <section className="firstrow">
          <Wallet />
          <Transaction />
        </section>

        <section className="secondrow">
          <History />
        </section>

      </div>
    );
  }
  
export default User;