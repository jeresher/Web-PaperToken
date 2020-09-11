const uuid = require('uuid').v1;
const { verifySignature } = require('../config/util');
const { REWARD_INPUT, MINING_REWARD } = require('../config/default');

class Transaction {
    constructor({ senderWallet, recipient, amount, outputMap, input }) {
        this.id = uuid();
        this.outputMap = outputMap || this.createOutputMap({senderWallet, recipient, amount});
        this.input = input || this.createInput({ senderWallet, outputMap: this.outputMap });
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

    // The transaction input is the official overview of the transaction.
    // ... `createInput` is how senders sign a transaction 
    // ... and what users use to validate the transaction.
    createInput({ senderWallet, outputMap }) {
        return {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(outputMap)
        };
    }

    // This update function is used to add a new recipient and amount to the existing transaction.
    update({ senderWallet, recipient, amount }) {

        // Check if the amount exceeds sender balance.
        if (amount > this.outputMap[senderWallet.publicKey]) {
            throw new Error('Amount exceeds balance');
        }

        // Add a new amount and recipient to the existing transaction.
        // ... Checks if the recipient already exists in the transaction (prevent override).
        if (!(recipient in this.outputMap)) {
            this.outputMap[recipient] = amount;
        } else {
            this.outputMap[recipient] = this.outputMap[recipient] + amount;
        }
        
        // Subtract new amount from `senderWallet.publicKey`.
        this.outputMap[senderWallet.publicKey] = this.outputMap[senderWallet.publicKey] - amount;

        // Generate a new signature (input) for the updated transaction.
        this.input = this.createInput({ senderWallet, outputMap: this.outputMap})
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

    static rewardTransaction(minerWallet) {
        
        return new this({
            input: REWARD_INPUT,
            outputMap: { [minerWallet.publicKey]: MINING_REWARD }
        })
        
    }
}

module.exports = Transaction;