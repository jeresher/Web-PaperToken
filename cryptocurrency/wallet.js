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

    static retrieveTransactions({ map, chain, address }) {
        let allTransactions = [];
        
        // Scan transaction pool for transactions from provided address.
        if (Object.keys(map).length > 0) {
            for (let transaction of Object.values(map)) {
                if(transaction.input.address === address) {
                    for (const [publicKey, amount] of Object.entries(transaction.outputMap)) {
                        if (publicKey !== address) {
                            allTransactions.push({
                                timestamp: transaction.input.timestamp,
                                recipient: publicKey,
                                amount: amount,
                                status: "Pending"
                            })
                        }
                    }
                }
            }
        }

        // Scan blockchain for transactions from provided address.
        for (let i=1; i<chain.length; i++) {
            const block = chain[i];
            
            for (let transaction of block.data) {
                if(transaction.input.address === address) {

                    for (const [publicKey, amount] of Object.entries(transaction.outputMap)) {
                        if (publicKey !== address) {
                            allTransactions.push({
                                timestamp: transaction.input.timestamp,
                                recipient: publicKey,
                                amount: amount,
                                status: "Completed"
                            })
                        }
                    }
                }
            }

        }

        return allTransactions;
    }
}

module.exports = Wallet;