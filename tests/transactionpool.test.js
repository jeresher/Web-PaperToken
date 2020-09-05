const Transaction = require('../cryptocurrency/transaction');
const TransactionPool = require('../cryptocurrency/transactionpool');
const Wallet = require('../cryptocurrency/wallet');


describe('TransactionPool', () => {
    let transactionPool, transaction;

    beforeEach(() => {
        transactionPool = new TransactionPool();
        transaction = new Transaction({
            senderWallet: new Wallet(),
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
})