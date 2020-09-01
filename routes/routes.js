const Blockchain = require('../services/blockchain');
const express = require('express');
const router = express.Router();

const blockchain = new Blockchain();

router.get('/api/blocks', (req, res) => {
    res.send(blockchain.chain);
})

router.post('/api/mine', (req, res) => {
    const { data } = req.body;

    blockchain.addBlock({ data });

    res.redirect('/api/blocks');
})

module.exports = router;