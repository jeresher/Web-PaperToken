const Block = require('./block');
const Transaction = require('../cryptocurrency/transaction');
const { cryptoHash } = require('../config/util');
const { REWARD_INPUT, MINING_REWARD } = require('../config/default');

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

    replaceChain(chain, onSuccess) {

        // CHECK IF INCOMING CHAIN IS LONGER.
        if (chain.length <= this.chain.length) return;

        // CHECK IF INCOMING CHAIN IS VALID.
        if (!Blockchain.isValidChain(chain)) return;

        // CALLBACK FUNCTION ON SUCCESS.
        if (onSuccess) onSuccess();

        this.chain = chain;
    }

    validTransactionData({ chain }) {
        for (let i=1; i<chain.length; i++) {
            const block = chain[i];
            let rewardTransactionCount = 0;

            for (let transaction of block.data) {
                if (transaction.input.address === REWARD_INPUT.address) {
                    rewardTransactionCount += 1;
                    
                    // CHECK IF THERE IS MORE THAN ONE REWARD TRANSACTION. 
                    if (rewardTransactionCount > 1) {
                        return false;
                    }

                    // CHECK IF MINING REWARD AMOUNT IS INVALID.
                    if (Object.values(transaction.outputMap)[0] !== MINING_REWARD) {
                        return false;
                    }

                } else {
                    
                    // CHECK IF THE TRANSACTION IS VALID.
                    if (!Transaction.validTransaction(transaction)) {
                        return false;
                    }
                }
            }
        }

        return true;
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