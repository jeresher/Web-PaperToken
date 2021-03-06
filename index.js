const express = require('express');
const request = require('request');
const path = require('path');
const Blockchain = require('./blockchain/blockchain');
const PubSub = require('./network/pubsub');
const TransactionPool = require('./cryptocurrency/transactionpool');
const Wallet = require('./cryptocurrency/wallet');
const TransactionMiner = require('./cryptocurrency/transactionminer');
const { PORT, ROOT_NODE_ADDRESS, DEFAULT_PORT, REDIS_URL } = require('./config/port');
const { convertDate } = require('./config/util')

const app = express();
const blockchain = new Blockchain();
const transactionPool = new TransactionPool;
const wallet = new Wallet();
const pubsub = new PubSub( { blockchain, transactionPool, redisUrl: REDIS_URL });
const transactionMiner = new TransactionMiner({ blockchain, transactionPool, wallet, pubsub});

app.use(express.json());

//Temporary for CORS.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
    res.header("Access-Control-Expose-Headers", "auth-token");
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
    var { amount, recipient } = req.body;
    amount = Number(amount);

    // ...Check if this wallet already has an existing transaction in the transaction pool.
    let transaction = transactionPool.existingTransaction(wallet); 

    // ...Create or update a transaction.
    try {
        if (transaction) {
            transaction.update({ senderWallet: wallet, recipient, amount });
        } else {
            transaction = wallet.createTransaction({ recipient, amount, chain: blockchain.chain });
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

// CRYPTOCURRENCY: RETRIEVE THE TRANSACTION POOL. 
app.get('/api/transaction-pool-map', (req, res) => {
    res.json(transactionPool.transactionMap)
})

app.get('/api/transaction-pool-addresses', (req, res) => {
    let addresses = [];

    if (Object.keys(transactionPool.transactionMap).length > 0) {
        for (let transaction of Object.values(transactionPool.transactionMap)) {
            addresses.push({
                date: convertDate(transaction.input.timestamp),
                address: transaction.input.address
            })
        }
    }

    res.json(addresses)
})

// CRYPTOCURRENCY: REQUEST TO MINE TRANSACTIONS.
app.get('/api/mine-transactions', (req, res) => {
    transactionMiner.mineTransactions();

    res.redirect('/api/blocks');
});

// CRYPTOCURRENCY: GET REQUEST TO RETRIEVE WALLET INFO.
app.get('/api/wallet-info', (req, res) => {
    const address = wallet.publicKey;

    res.json({
        address,
        balance: Wallet.calculateBalance({ chain: blockchain.chain, address }),
        transactions: Wallet.retrieveTransactions({ map: transactionPool.transactionMap, chain: blockchain.chain, address })
    })
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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ))

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Listening at localhost: ${PORT}`)

    if (PORT !== DEFAULT_PORT) {
        syncOnConnect();
    }
})