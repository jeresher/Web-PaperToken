const Transaction = require('./transaction');

class TransactionPool {
    constructor() {
        this.transactionMap = {};
    }

    setTransaction(transaction) {
        this.transactionMap[transaction.id] = transaction;
    }

    replaceTransactionMap(transactionMap) {
        this.transactionMap = transactionMap;
    }

    existingTransaction(wallet) {
        const transactions = Object.values(this.transactionMap);

        return transactions.find(transaction => transaction.input.address === wallet.publicKey )
    }

    validTransactions() {
        return Object.values(this.transactionMap).filter( 
            transaction => Transaction.validTransaction(transaction)
        )
    }

    clear() {
        this.transactionMap = {};
    }

    // Safe way of clearing transactions when peers are accepting a new blockchain.
    // ... There's no chance of it wiping away unaccounted for transactions in the local pool.
    clearBlockchainTransactions({ chain }) {
        for (let i=1; i<chain.length; i++) {
            const block = chain[i];

            for (let transaction of block.data) {
                if (this.transactionMap[transaction.id]) {
                    delete this.transactionMap[transaction.id];
                }
            }
        }
    }
}

module.exports = TransactionPool;