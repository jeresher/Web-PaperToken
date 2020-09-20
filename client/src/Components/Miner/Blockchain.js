import React, { useState, useEffect } from 'react';

function Blockchain() {

    const [blockchain, setBlockchain] = useState();
    const [blockchainItems, setBlockchainItems] = useState();

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
            let blockchain = formatBlockchain(result)
            console.log(blockchain);
            /*
            setBlockchain(blockchain);
            setBlockchainItems(blockchain.map(block => 
                <BlockchainItem block={block} />
            ))
            */
        })
        .catch(err => console.log(err))
    }

    useEffect(() => retrieveBlockchain(), [])

    return (
        <div className="blockchain-container">
            <h1>Blockchain</h1>
        </div>
    )
}

export default Blockchain;