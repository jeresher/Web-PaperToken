const { STARTING_BALANCE } = require('../config/default')

class Wallet {
    constructor() {
        this.balance = STARTING_BALANCE;
    }

    findStartingBalance() {

    }
}

module.exports = Wallet;