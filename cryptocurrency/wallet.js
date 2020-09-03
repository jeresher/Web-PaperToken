const transaction = require('./transaction');
const { STARTING_BALANCE } = require('../config/default')
const { ec, cryptoHash } = require('../config/util');

class Wallet {
    constructor() {
        this.balance = STARTING_BALANCE;  
        this.keyPair = ec.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex'); 
    }

    sign(data) {
        return this.keyPair.sign(cryptoHash(data))
    }

    createTransaction({ recipient, amount }) {
        
        // Throw an error if the transaction amount is greater than balance.
        if (amount > this.balance) throw new Error('Amount exceeds balance');

        return new Transaction({ senderWallet: this, recipient, amount });
    }
}

module.exports = Wallet;