

class TransactionPool {
    constructor() {
        this.transactionMap = {};
    }

    setTransaction(transaction) {
        this.transactionMap[transaction.id] = transaction;
    }

    existingTransaction(wallet) {
        const transactions = Object.values(this.transactionMap);

        return transactions.find(transaction => transaction.input.address === wallet.publicKey )
    }
}

module.exports = TransactionPool;