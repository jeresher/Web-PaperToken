import React from 'react';

function BlockchainItem({transaction}) {
    return (
        <tr>
            <td className="blockchain-sender">{transaction.sender}</td>
            <td className="blockchain-receiver">{transaction.receiver}</td>
            <td className="blockchain-amount">{transaction.amount}</td>
        </tr>
    )
}

export default BlockchainItem;