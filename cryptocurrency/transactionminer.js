const Transaction = require('./transaction');

class TransactionMiner {

    constructor({ blockchain, transactionPool, wallet, pubsub }) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubsub = pubsub;

    }

    mineTransactions() {
        // ... Get the transaction pool's valid transactions.
        const validTransactions = this.transactionPool.validTransactions();

        // ... Generate the miner's reward.
        validTransactions.push(
            Transaction.rewardTransaction({ minerWallet: this.wallet })
        )
        
        // ... Add a block consisting of these transactions to the blockchain.
        this.blockchain.addBlock({ daata: validTransactions });

        // ... Broadcast the updated blockchain.
        this.pubsub.broadcastChain();

        // ... Clear the pool.
        this.transactionPool.clear();
    }
}

module.exports = TransactionMiner;