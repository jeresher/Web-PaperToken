const express = require('express');
const request = require('request');
const Blockchain = require('./blockchain/blockchain');
const PubSub = require('./network/pubsub');
const TransactionPool = require('./cryptocurrency/transactionpool')
const Wallet = require('./cryptocurrency/wallet')
const { PORT, ROOT_NODE_ADDRESS, DEFAULT_PORT } = require('./config/port');

const app = express();
const blockchain = new Blockchain();
const transactionPool = new TransactionPool;
const wallet = new Wallet();
const pubsub = new PubSub( { blockchain, transactionPool });

app.use(express.json());

// BLOCKCHAIN: GET REQUEST TO RETRIEVE THE CHAIN.
app.get('/api/blocks', (req, res) => {
    res.send(blockchain.chain);
})

// BLOCKCHAIN: POST REQUEST TO MINE A BLOCK.
app.post('/api/mine', (req, res) => {
    const { data } = req.body;

    blockchain.addBlock({ data });

    pubsub.broadcastChain();

    res.redirect('/api/blocks');
})

// CRYPTOCURRENCY: POST REQUEST TO SEND CURRENCY.
app.post('/api/transact', (req, res) => {
    const { amount, recipient } = req.body;

    // ...Check if this wallet already has an existing transaction in the transaction pool.
    let transaction = transactionPool.existingTransaction(wallet); 

    // ...Create or update a transaction.
    try {
        if (transaction) {
            transaction.update({ senderWallet: wallet, recipient, amount });
        } else {
            transaction = wallet.createTransaction({ recipient, amount });
        }
    } catch(error) {
        return res.status(400).json({ type: 'error', message: error.message })
    }

    // ...Add it to the transaction pool.
    transactionPool.setTransaction(transaction);

    // ... Broadcast the transaction so that users can add it to their transaction pool.
    pubsub.broadcastTransaction(transaction);
    
    res.json({ type: 'success', transaction });
})

app.get('/api/transaction-pool-map', (req, res) => {
    res.json(transactionPool.transactionMap)
})

// BLOCKCHAIN: SYNC BLOCKCHAIN INSTANCE TO CURRENT BLOCKCHAIN ON CONNECT.
const syncOnConnect = () => {

    // ... Sync blockchain.
    request({ url: `${ROOT_NODE_ADDRESS}/api/blocks`}, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            const rootChain = JSON.parse(body);

            console.log('replacing chain on sync with', rootChain)
            blockchain.replaceChain(rootChain);
        }
    });

    // Sync transaction pool.
    request({ url: `${ROOT_NODE_ADDRESS}/api/transaction-pool-map`}, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            const rootTransactionPoolMap = JSON.parse(body);

            console.log('replace transaction pool map on sync with', rootTransactionPoolMap)
            transactionPool.replaceTransactionMap(rootTransactionPoolMap);
        }
    });
}

app.listen(PORT, () => {
    console.log(`Listening at localhost: ${PORT}`)

    if (PORT !== DEFAULT_PORT) {
        syncOnConnect();
    }
})