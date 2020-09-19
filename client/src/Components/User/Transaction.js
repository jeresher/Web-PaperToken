import React from 'react';

function Transaction() {

    function submitTransaction(event) {

        const recipient = document.getElementById('recipient');
        const amount = document.getElementById('amount');

        fetch("http://localhost:5000/api/transact", {
            method: "POST",
            body: JSON.stringify({
                "recipient": recipient.value,
                "amount": amount.value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => window.location.reload())
        .catch(err => console.log(err))
        
    }

    return (
        <form 
            className="transaction-container"
            onSubmit={(event) => submitTransaction(event)}
        >
            <h1>Create a Transaction</h1>
            <div className="transaction-form">
                <div className="flex-row">
                    <h4>Recipient's Public Key</h4>
                    <input
                        id="recipient" 
                        type="text"
                        required
                    ></input>
                </div>
                <div className="flex-row">
                    <h4>Send Amount</h4>
                    <input 
                        id="amount" 
                        type="number" 
                        min="1"
                        required
                    ></input>
                </div>
                <button>SEND</button>
            </div>
        </form>
    )
}

export default Transaction;