const crypto = require('crypto');
const EC = require('elliptic').ec;

// USED TO GENERATE A SHA256 HASH.
const cryptoHash = (...inputs) => {
    const hash = crypto.createHash('sha256');

    hash.update(inputs.sort().join(' '));

    return hash.digest('hex');
};

// USED TO GENERATE ELLIPTICAL BASED KEY PAIRS.
const ec = new EC('secp256k1');

module.exports = { 
    cryptoHash,
    ec 
};