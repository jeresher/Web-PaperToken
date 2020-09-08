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
}

module.exports = TransactionPool;