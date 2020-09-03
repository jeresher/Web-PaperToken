const { STARTING_BALANCE } = require('../config/default')
const { ec } = require('../config/util');

class Wallet {
    constructor() {
        this.balance = STARTING_BALANCE;  
        
        const keyPair = ec.genKeyPair();

        this.publicKey = keyPair.getPublic().encode('hex'); 
    }

    findStartingBalance() {

    }
}

const wallet = new Wallet()

module.exports = Wallet;