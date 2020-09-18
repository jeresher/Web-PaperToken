import React from 'react';

function Transaction() {
    return (
        <div className="transaction-container">
            <h1>Create a Transaction</h1>
            <div className="transaction-form">
                <div className="flex-row">
                    <h4>Recipient's Public Key</h4>
                    <input type="text"></input>
                </div>
                <div className="flex-row">
                    <h4>Send Amount</h4>
                    <input type="number" max="30"></input>
                </div>
                <button>SEND</button>
            </div>
        </div>
    )
}

export default Transaction;