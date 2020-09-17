import React from 'react';
import Wallet from './User/Wallet';
import Transaction from './User/Transaction';

function User() {
    return (
      <div className="user-container">
        <section className="firstrow">
          <Wallet />
          <Transaction />
        </section>

        <section className="secondrow">

          <section className="history-container">
            <h2>history</h2>
          </section>

        </section>

      </div>
    );
  }
  
export default User;