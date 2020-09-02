const Blockchain = require('../services/blockchain');
const express = require('express');
const router = express.Router();
const PubSub = require('../pubsub');

const blockchain = new Blockchain();
const pubsub = new PubSub( { blockchain });

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

module.exports = router;