import React from "react";

function TransactionPoolItem({transactionPool}) {
    return (
        <tr>
            <td className="transactionpool-address">{transactionPool.address}</td>
            <td className="transactionpool-date">{transactionPool.date}</td>
        </tr>
    )
}

export default TransactionPoolItem;