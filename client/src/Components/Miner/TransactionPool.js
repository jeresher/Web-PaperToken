import React, {useEffect, useState} from 'react';
import TransactionPoolItem from './TransactionPoolItem';

function TransactionPool() {

    const [transactionPool, setTransactionPool] = useState([]);
    const [transactionPoolItems, setTransactionPoolItems] = useState([]);

    function retrievePoolTransactions() {
        fetch("http://localhost:5000/api/transaction-pool-addresses")
        .then(res => res.json())
        .then(result => {
            setTransactionPool(result)
            setTransactionPoolItems(result.map(transactionPool => 
                <TransactionPoolItem transactionPool={transactionPool} />
            ))
        })
        .catch(err => console.log(err))
    }

    function minePoolTransactions() {
        fetch("http://localhost:5000/api/mine-transactions")
        .then(res => window.location.reload())
        .catch(err => console.log(err))
    }

    useEffect(retrievePoolTransactions, [])

    return (
        <div className="transactionpool-container">

            {/* POOL HEADING */}
            <h1>Transaction Pool</h1>

            {/* POOL TABLE */}
            <div className="transactionpool-table">
                <table>
                    <thead>
                        <tr>
                            <th className="transactionpool-address">Pending Transactions (Sender)</th>
                            <th className="transactionpool-date">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {transactionPoolItems}
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* POOL MINE BUTTON */}
            <div className="transactionpool-mine">
                <button onClick={() => minePoolTransactions()}>Mine Transactions</button>
            </div>

        </div>
    )
}

export default TransactionPool;