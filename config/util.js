const crypto = require('crypto');
const EC = require('elliptic').ec;

// USED TO GENERATE A SHA256 HASH.
const cryptoHash = (...inputs) => {
    const hash = crypto.createHash('sha256');

    hash.update(inputs.map(input => JSON.stringify(input)).sort().join(' '));

    return hash.digest('hex');
};

// USED TO GENERATE ELLIPTICAL BASED KEY PAIRS.
const ec = new EC('secp256k1');


const verifySignature = ({ publicKey, data, signature }) => {
    const keyFromPublic = ec.keyFromPublic(publicKey, 'hex');

    return keyFromPublic.verify(cryptoHash(data), signature);
};

module.exports = { 
    cryptoHash,
    ec,
    verifySignature
};