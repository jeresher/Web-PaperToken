const Blockchain = require('../services/blockchain');
const express = require('express');
const router = express.Router();

const blockchain = new Blockchain();

router.get('/api/blocks', (req, res) => {
    res.send(blockchain.chain);
})

module.exports = router;