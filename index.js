const express = require('express');
const request = require('request');
const Blockchain = require('./services/blockchain');
const PubSub = require('./network/pubsub');
const { PORT, DEFAULT_PORT } = require('./config/port');
const app = express();

const blockchain = new Blockchain();
const pubsub = new PubSub( { blockchain });
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`

setTimeout(() => pubsub.broadcastChain(), 1000);

app.use(express.json());

app.get('/api/blocks', (req, res) => {
    res.send(blockchain.chain);
})

app.post('/api/mine', (req, res) => {
    const { data } = req.body;

    blockchain.addBlock({ data });

    pubsub.broadcastChain();

    res.redirect('/api/blocks');
})

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

    syncChains();
})