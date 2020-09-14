const Transaction = require('./transaction');
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

    createTransaction({ recipient, amount, chain }) {

        // Calculate the balance of the sender wallet.
        if (chain) {
            this.balance = Wallet.calculateBalance({
                chain,
                address: this.publicKey
            })
        }
        
        // Throw an error if the transaction amount is greater than sender balance.
        if (amount > this.balance) throw new Error('Amount exceeds balance');

        return new Transaction({ senderWallet: this, recipient, amount });
    }

    static calculateBalance({ chain, address }) {
        let hasConductedTransaction = false;
        let outputsTotal = 0;

        for (let i=chain.length-1; i>0; i--) {
            const block = chain[i];

            for (let transaction of block.data) {
                if(transaction.input.address === address) {
                    hasConductedTransaction = true;
                }

                const addressOutput = transaction.outputMap[address];

                if (addressOutput) {
                    outputsTotal = outputsTotal + addressOutput;
                }
            }

            if (hasConductedTransaction) {
                break;
            }
        }

        return hasConductedTransaction ? outputsTotal : STARTING_BALANCE + outputsTotal
    }
}

module.exports = Wallet;