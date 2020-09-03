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

}

const wallet = new Wallet()

module.exports = Wallet;