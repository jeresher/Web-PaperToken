const uuid = require('uuid').v1;
const { verifySignature } = require('../config/util');

class Transaction {
    constructor({ senderWallet, recipient, amount }) {
        this.id = uuid();
        this.outputMap = this.createOutputMap({senderWallet, recipient, amount});
        this.input = this.createInput({ senderWallet, outputMap: this.outputMap });
    }

    // The OutputMap details information about the transaction.
    // ... It includes the amount a recipent will receive
    // ... and the remaining balance of the sender once the transaction is complete.
    createOutputMap({ senderWallet, recipient, amount }) {
        const outputMap = {};

        outputMap[recipient] = amount;
        outputMap[senderWallet.publicKey] = senderWallet.balance - amount;

        return outputMap;
    }

    // The transaction input gives official details about the transaction.
    // ... This is how senders sign a transaction 
    // ... and what users use to validate the transaction.
    createInput({ senderWallet, outputMap }) {
        return {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(outputMap)
        };
    }

    static validTransaction(transaction) {
        const { input: { address, amount, signature}, outputMap } = transaction;

        // Check if `amount` is equal to all the values contained in the `outputMap`. (check tampering)
        const outputMapTotal = Object.values(outputMap).reduce((total, outputAmount) => total + outputAmount)
        if (amount !== outputMapTotal) return false;

        // Check if the signature is invalid.
        if (!verifySignature({ publicKey: address, data: outputMap, signature})) return false;

        return true;

    }
}

module.exports = Transaction;