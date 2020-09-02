const Blockchain = require('../services/blockchain');
const PubSub = require('../pubsub');
const {DEFAULT_PORT} = require('../config/port');
const request = require('request');
const express = require('express');
const router = express.Router();


const blockchain = new Blockchain();
const pubsub = new PubSub( { blockchain });

const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`

setTimeout(() => pubsub.broadcastChain(), 1000);

router.get('/api/blocks', (req, res) => {
    res.send(blockchain.chain);
})

router.post('/api/mine', (req, res) => {
    const { data } = req.body;

    blockchain.addBlock({ data });

    pubsub.broadcastChain();

    res.redirect('/api/blocks');
})

const syncChains = () => {
    request({ url: `${ROOT_NODE_ADDRESS}/api/blocks`})
}

module.exports = router;