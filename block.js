const hexToBinary = require('hex-to-binary');
const { GENESIS_DATA, MINE_RATE } = require('./config');
const cryptoHash = require('./crypto-hash');

class Block {
    constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis() {
        return new Block(GENESIS_DATA);
    }

    static mineBlock({ lastBlock, data }) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timestamp })
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
        } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

        return new Block({timestamp, lastHash, data, difficulty, nonce, hash});
    }

    static adjustDifficulty({ originalBlock, timestamp}) {
        const { difficulty } = originalBlock;
        const difference = timestamp - originalBlock.timestamp;

        // ENSURE DIFFICULTY IS ALWAYS AT LEAST 1.
        if (difficulty < 1) return 1;
        
        // REDUCE DIFFICULTY IF DIFFERENCE IS GREATER THAN MINE_RATE.
        if (difference > MINE_RATE) return difficulty - 1;

        // INCREASE DIFFICULTY IF DIFFERENCE IS LESS THAN MINE_RATE.
        return difficulty + 1;
    }
}

module.exports = Block;