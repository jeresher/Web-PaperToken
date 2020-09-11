const Transaction = require('../cryptocurrency/transaction');
const TransactionPool = require('../cryptocurrency/transactionpool');
const Wallet = require('../cryptocurrency/wallet');
const Blockchain = require('../blockchain/blockchain');


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

    describe('validTransactions()', () => {
        let validTransactions;

        beforeEach(() => {
            validTransactions = [];

            for (let i=0; i<10; i++) {
                transaction = new Transaction({
                    senderWallet,
                    recipient: 'any-recipient',
                    amount: 30
                })
                if (i%3===0) {
                    transaction.input.amount = 888888;
                } else if (i%3===1) {
                    transaction.input.signature = new Wallet().sign('foo');
                } else {
                    validTransactions.push(transaction);
                }
                transactionPool.setTransaction(transaction);
            }
        })

        it('returns valid transaction', () => {
            expect(transactionPool.validTransactions()).toEqual(validTransactions);
        });
    });

    describe('clear()', () => {
        it('clears the transactions', () => {
            transactionPool.clear();

            expect(transactionPool.transactionMap).toEqual({});
        })
    });

    describe('clearBlockchainTransactions()', () => {
        it('clears the pool of any existing blockchain transactions', () => {
            const blockchain = new Blockchain();
            const expectedTransactionMap = {};

            for (let i=0; i<6; i++) {
                const transaction = new Wallet().createTransaction({
                    recipient: 'foo',
                    amount: 5
                })

                transactionPool.setTransaction(transaction);

                if (i%2===0) {
                    blockchain.addBlock({ data: [transaction] })
                } else {
                    expectedTransactionMap[transaction.id] = transaction;
                }
            }

            transactionPool.clearBlockchainTransactions({ chain: blockchain.chain });
            expect(transactionPool.transactionMap).toEqual(expectedTransactionMap);
        })
    })
})