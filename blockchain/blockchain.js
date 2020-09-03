const Block = require('./block');
const { cryptoHash } = require('../config/util');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length-1],
            data: data
        })

        this.chain.push(newBlock);
    }

    replaceChain(chain) {

        // CHECK IF INCOMING CHAIN IS LONGER.
        if (chain.length <= this.chain.length) return;

        // CHECK IF INCOMING CHAIN IS VALID.
        if (!Blockchain.isValidChain(chain)) return;

        this.chain = chain;
    }

    static isValidChain(chain) {

        // CHECK IF GENESIS BLOCK IS CORRECT.
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        for (let i=1; i<chain.length; i++) {
            const { timestamp, lastHash, nonce, difficulty, hash, data } = chain[i];

            // CHECK IF THE LAST HASH IS CORRECT.
            const actualLastHash = chain[i-1].hash;
            if (lastHash !== actualLastHash) return false;

            // CHECK IF THE HASH IS CORRECT.
            const validatedHash = cryptoHash(timestamp, lastHash, nonce, difficulty, data);
            if (hash !== validatedHash) return false;

            // CHECK FOR DIFFICULTY JUMP ATTACKS.
            const lastDifficulty = chain[i-1].difficulty;
            if (Math.abs(lastDifficulty - difficulty) > 1) return false;
        }

        return true;
    }
}

module.exports = Blockchain;