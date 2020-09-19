import React, {useEffect, useState} from 'react';
import HistoryItem from './HistoryItem';

function History() {

    const [history, setHistory] = useState([]);
    const [historyItem, setHistoryItems] = useState([]);

    function retrieveTransactions() {
        fetch("http://localhost:5000/api/wallet-info")
        .then(res => res.json())
        .then(result => {
            setHistory(result);
            setHistoryItems(result.transactions.map(history => 
                <HistoryItem history={history} />
            ))
        })
        .catch(err => console.log(err))
      }


    useEffect(retrieveTransactions, [])

    return (
      <section className="history-container">
        <h1>Your Transactions</h1>
        <div className="history-table">
            <table>
                <thead>
                    <tr>
                        <th className="history-date">Date</th>
                        <th className="history-recipient">Recipient</th>
                        <th className="history-amount">Amount</th>
                        <th className="history-status">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {historyItem}
                    <tr>
                        <td className="history-date">9/18/2020</td>
                        <td className="history-recipient">{history.address}</td>
                        <td className="history-amount">1000</td>
                        <td className="history-status">Completed</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </section>
    )
}

export default History;