import React, { useState, useEffect } from 'react';
import BlockchainItem from './BlockchainItem';
import BlockchainNavigation from './BlockchainNavigation';

function Blockchain() {

    const [blockchain, setBlockchain] = useState([]); // blockchain = [[], [{sender, received, amount}, {...}], []]
    const [blockchainItems, setBlockchainItems] = useState();
    const [currentBlockIndex, setCurrentBlockIndex] = useState(0);

    function retrieveBlockchain() {
        fetch(`${document.location.origin}/api/blocks`)
        .then(res => res.json())
        .then(result => {
            let blockchain = formatBlockchain(result) 
            setBlockchain(blockchain)
            setBlockchainItems(blockchain.map(block => block.map(transaction =>
                    <BlockchainItem transaction={transaction} />
                )
            ))
        })
        .catch(err => console.log(err))
    }

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

    useEffect(() => retrieveBlockchain(), [])
    useEffect(() => setCurrentBlockIndex(blockchain.length-1), [blockchain])

    return (
        <div className="blockchain-container">

            {/* BLOCKCHAIN HEADING*/}
            <h1>Blockchain</h1>

            {/* BLOCKCHAIN TABLE*/}
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
                            {blockchainItems ? blockchainItems[currentBlockIndex] : null}
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* BLOCKCHAIN NAVIGATION*/}
            <BlockchainNavigation 
                blockchain={blockchain} 
                currentBlockIndex={currentBlockIndex}
                setCurrentBlockIndex={setCurrentBlockIndex}
            />
        </div>
    )
}

export default Blockchain;