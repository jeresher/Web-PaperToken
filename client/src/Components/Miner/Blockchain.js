import React, { useState, useEffect } from 'react';
import BlockchainItem from './BlockchainItem';

function Blockchain() {

    const [blockchain, setBlockchain] = useState([]);
    const [blockchainItems, setBlockchainItems] = useState();
    const [currentBlockIndex, setCurrentBlockIndex] = useState(0);

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

    function configurePaginationButtons() {
        let leftButtons = document.getElementsByClassName('left-buttons');
        let rightButtons = document.getElementsByClassName('right-buttons');

        function enableButtons(boolean, buttons) {

            if (boolean === true) {
                for (let i=0; i < buttons.length; i++) {
                    buttons[i].style.color = "#5a5a5a";
                    buttons[i].disabled = false;
                }
            } else {
                for (let i=0; i < buttons.length; i++) {
                    buttons[i].style.color = "#242424";
                    buttons[i].disabled = true;
                }
            }

        }

        if (currentBlockIndex === 0) enableButtons(false, leftButtons);
        else enableButtons(true, leftButtons);

        if (currentBlockIndex === blockchain.length - 1) enableButtons(false, rightButtons);
        else enableButtons(true, rightButtons);
    }



    useEffect(() => retrieveBlockchain(), [])
    useEffect(() => setCurrentBlockIndex(blockchain.length-1), [blockchain])
    useEffect(() => configurePaginationButtons(), [currentBlockIndex])

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
                        {blockchainItems ? blockchainItems[currentBlockIndex] : null}
                    </tr>
                </tbody>
            </table>
            </div>
            <div className="blockchain-navigation">

                <button
                    className="left-buttons"
                    onClick={() => setCurrentBlockIndex(0)}
                >{"<<"}</button>

                <button
                    className="left-buttons"
                    onClick={(event) => {
                        if (currentBlockIndex <= 0) setCurrentBlockIndex(0);
                        else setCurrentBlockIndex(currentBlockIndex - 1);
                    }}
                >{"<"}</button>

                <h6>Block {currentBlockIndex}</h6>

                <button
                    className="right-buttons"
                    onClick={(event) => {
                        if (currentBlockIndex >= blockchain.length-1) setCurrentBlockIndex(blockchain.length-1);
                        else setCurrentBlockIndex(currentBlockIndex + 1);
                    }}
                >{">"}</button>

                <button
                    className="right-buttons"
                    onClick={() => setCurrentBlockIndex(blockchain.length - 1)}
                >{">>"}</button>
            </div>
        </div>
    )
}

export default Blockchain;