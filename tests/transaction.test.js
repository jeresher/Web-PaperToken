const Transaction = require('../cryptocurrency/transaction');
const Wallet = require('../cryptocurrency/wallet');
const { verifySignature } = require('../config/util');


describe('Transaction', () => {
    let transaction, senderWallet, recipient, amount;

    beforeEach(() => {
        senderWallet = new Wallet();
        recipient = 'recipient-public-key';
        amount = 10;

        transaction = new Transaction({ senderWallet, recipient, amount })
    });

    it('has an `id`', () => {
        expect(transaction).toHaveProperty('id');
    });

    describe('outputMap', () => {
        it('has an `outputMap', () => {
            expect(transaction).toHaveProperty('outputMap');
        })
        it('outputs the amount to the recipient', () => {
            expect(transaction.outputMap[recipient]).toEqual(amount);
        })
        it('outputs the remaining balance in `senderWallet`', () => {
            expect(transaction.outputMap[senderWallet.publicKey]).toEqual(senderWallet.balance - amount);
        })
    })

    describe('input', () => {
        it('has an `input`', () => {
            expect(transaction).toHaveProperty('input');
        })
        it('has a `timestamp` in the input', () => {
            expect(transaction.input).toHaveProperty('timestamp');
        })
        it('sets the `amount` to the `senderWallet` balance', () => {
            expect(transaction.input.amount).toEqual(senderWallet.balance);
        })
        it('sets the `address` to the `senderWallet` public key', () => {
            expect(transaction.input.address).toEqual(senderWallet.publicKey);
        });
        it('signs the input', () => {
            expect(
                verifySignature({
                    publicKey: senderWallet.publicKey,
                    data: transaction.outputMap,
                    signature: transaction.input.signature
                })
            ).toBe(true);
        })
    })

    describe('validTransaction()', () => {

        describe('when the transaction is valid', () => {
            it('returns true', () => {
                expect(Transaction.validTransaction(transaction)).toBe(true);
            })
        })
        describe('when the transaction is invalid', () => {
            describe('and a transaction outputMap is invalid', () => {
                it('returns false', () => {
                    transaction.outputMap[senderWallet.publicKey] = '12wj18eh1e12'

                    expect(Transaction.validTransaction(transaction)).toBe(false);
                })
            })
            describe('and a transaction input signature is invalid', () => {
                it('returns false', () => {
                    transaction.input.signature = new Wallet().sign('data');

                    expect(Transaction.validTransaction(transaction)).toBe(false);
                })
            })
        })

    })
});