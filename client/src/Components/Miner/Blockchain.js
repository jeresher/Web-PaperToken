import React, { useState, useEffect } from 'react';
import BlockchainItem from './BlockchainItem';

function Blockchain() {

    const [blockchain, setBlockchain] = useState([]);
    const [blockchainItems, setBlockchainItems] = useState([]);

    function formatBlockchain(chain) {
        let formattedChain = [];

        for (let i=0; i<chain.length; i++) {
            let formattedBlock = [];
            let data = chain[i].data;

            for (let i=0; i<data.length - 1; i++) {
                let outputMap = data[i].outputMap;
                let sender = data[i].input.address;

                for (const [key, value] of Object.entries(outputMap)) {
                    if (key === sender) continue;
                    formattedBlock.push({
                        sender,
                        receiver: key,
                        amount: value,
                    })
                }
            }

            formattedChain.push(formattedBlock);
        }

        return formattedChain;
    }

    function retrieveBlockchain() {
        fetch("http://localhost:5000/api/blocks")
        .then(res => res.json())
        .then(result => {
            let blockchain = formatBlockchain(result) // blockchain = [[], [{sender, received, amount}], []]
            setBlockchain(blockchain)
            setBlockchainItems(blockchain.map(block => block.map(transaction =>
                    <BlockchainItem transaction={transaction} />
                )
            ))
        })
        .catch(err => console.log(err))
    }

    useEffect(() => retrieveBlockchain(), [])
    useEffect(() => {
        console.log(blockchainItems)
    }, [blockchainItems])

    return (
        <div className="blockchain-container">
            <h1>Blockchain</h1>
            <div className="blockchain-table">
            <table>
                <thead>
                    <tr>
                        <th className="blockchain-sender">Sender</th>
                        <th className="blockchain-receiver">Receiver</th>
                        <th className="blockchain-amount">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {blockchainItems.length > 0 ? blockchainItems[1] : null}
                    </tr>
                    <tr>
                        <td className="blockchain-sender">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-receiver">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-amount">50000</td>
                    </tr>
                    <tr>
                        <td className="blockchain-sender">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-receiver">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-amount">50000</td>
                    </tr>
                    <tr>
                        <td className="blockchain-sender">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-receiver">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-amount">50000</td>
                    </tr>
                    <tr>
                        <td className="blockchain-sender">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-receiver">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-amount">50000</td>
                    </tr>
                    <tr>
                        <td className="blockchain-sender">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-receiver">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-amount">50000</td>
                    </tr>
                    <tr>
                        <td className="blockchain-sender">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-receiver">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-amount">50000</td>
                    </tr>
                    <tr>
                        <td className="blockchain-sender">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-receiver">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-amount">50000</td>
                    </tr>
                    <tr>
                        <td className="blockchain-sender">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-receiver">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-amount">50000</td>
                    </tr>
                    <tr>
                        <td className="blockchain-sender">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-receiver">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-amount">50000</td>
                    </tr>
                    <tr>
                        <td className="blockchain-sender">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-receiver">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-amount">50000</td>
                    </tr>
                    <tr>
                        <td className="blockchain-sender">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-receiver">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-amount">50000</td>
                    </tr>
                    <tr>
                        <td className="blockchain-sender">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-receiver">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-amount">50000</td>
                    </tr>
                    <tr>
                        <td className="blockchain-sender">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-receiver">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-amount">50000</td>
                    </tr>
                    <tr>
                        <td className="blockchain-sender">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-receiver">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-amount">50000</td>
                    </tr>
                    <tr>
                        <td className="blockchain-sender">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-receiver">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-amount">50000</td>
                    </tr>
                    <tr>
                        <td className="blockchain-sender">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-receiver">04f9bb63e1304fcfe7b22d655e3c00f4fd27715b42a59be741a3f98e10963a145d82eb2cd57aff5e0a811c1cfee5c8c8225cb6875c4a799f2a5524329df0b34063</td>
                        <td className="blockchain-amount">50000</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Blockchain;