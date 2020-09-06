const Transaction = require('../cryptocurrency/transaction');
const TransactionPool = require('../cryptocurrency/transactionpool');
const Wallet = require('../cryptocurrency/wallet');


describe('TransactionPool', () => {
    let transactionPool, transaction, senderWallet;

    beforeEach(() => {
        transactionPool = new TransactionPool();
        senderWallet = new Wallet()
        transaction = new Transaction({
            senderWallet,
            recipient: 'fake-recipient',
            amount: 10
        })
    })

    describe('setTransaction()', () => {
        it('adds a transaction', () => {
            transactionPool.setTransaction(transaction)
            expect(transactionPool.transactionMap[transaction.id])
            .toBe(transaction);
        })
    })

    describe('existingTransaction()', () => {
        it('returns an existing transaction given a wallet', () => {
            transactionPool.setTransaction(transaction);

            expect(transactionPool.existingTransaction(senderWallet))
            .toBe(transaction);
        })
    })

    describe('viewTransactions()', () => {
        it('returns all transactions from a given wallet', () => {
            
        })
    })
})