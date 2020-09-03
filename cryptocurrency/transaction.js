const uuid = require('uuid').v1;

class Transaction {
    constructor({ senderWallet, recipient, amount }) {
        this.id = uuid();
        this.outputMap = this.createOutputMap({senderWallet, recipient, amount});
        this.input = this.createInput({ senderWallet, outputMap: this.outputMap });
    }

    // The OutputMap details information about the transaction.
    createOutputMap({ senderWallet, recipient, amount }) {
        const outputMap = {};

        outputMap[recipient] = amount;
        outputMap[senderWallet.publicKey] = senderWallet.balance - amount;

        return outputMap;
    }

    // The transaction input gives official details about the transaction.
    // ... It is also used by users to validate if the transaction is valid.
    createInput({ senderWallet, outputMap }) {
        return {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(outputMap)
        };
    }
}

module.exports = Transaction;