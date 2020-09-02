const express = require('express');
const request = require('request');
const Blockchain = require('./blockchain/blockchain');
const PubSub = require('./network/pubsub');
const { PORT, ROOT_NODE_ADDRESS, DEFAULT_PORT } = require('./config/port');
const app = express();

const blockchain = new Blockchain();
const pubsub = new PubSub( { blockchain });

app.use(express.json());

// GET REQUEST TO RETRIEVE THE CHAIN.
app.get('/api/blocks', (req, res) => {
    res.send(blockchain.chain);
})

// POST REQUEST TO MINE A BLOCK.
app.post('/api/mine', (req, res) => {
    const { data } = req.body;

    blockchain.addBlock({ data });

    pubsub.broadcastChain();

    res.redirect('/api/blocks');
})

// SYNC BLOCKCHAIN INSTANCE TO CURRENT BLOCKCHAIN ON CONNECT.
const syncChains = () => {
    request({ url: `${ROOT_NODE_ADDRESS}/api/blocks`}, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            const rootChain = JSON.parse(body);

            console.log('replacing chain on sync with', rootChain)
            blockchain.replaceChain(rootChain);
        }
    });
}

app.listen(PORT, () => {
    console.log(`Listening at localhost: ${PORT}`)

    if (PORT !== DEFAULT_PORT) {
        syncChains();
    }
})