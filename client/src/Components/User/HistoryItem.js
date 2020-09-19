import React from "react";

function HistoryItem({history}) {

    return (
        <tr>
        <td className="history-date">{history.date}</td>
        <td className="history-recipient">{history.recipient}</td>
        <td className="history-amount">{history.amount}</td>
        <td className="history-status">{history.status}</td>
    </tr>
    )
}

export default HistoryItem;