const Blockchain = require('../blockchain/blockchain');
const Block = require('../blockchain/block');
const cryptoHash = require('../blockchain/crypto-hash');

describe('Blockchain', () => {
    let blockchain, newChain, originalChain;

    beforeEach(() => {
        blockchain = new Blockchain();
        newChain = new Blockchain();
        originalChain = blockchain.chain;
    })

    it('contains a `chain` array', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    })
    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    })
    it('allows a new block to be added to the chain', () => {
        const newData = 'foo bar';
        blockchain.addBlock({ data: newData });
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);
    })

    describe('isValidChain()', () => {

        describe('when the chain does not start with the genesis block', () => {
            it('returns false', () => {
                blockchain.chain[0] = { data: 'fake-genesis' };

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        })

        describe('when the chain starts with the genesis block and has multiple blocks', () => {
            beforeEach(() => {
                blockchain.addBlock({ data: 'Red' });
                blockchain.addBlock({ data: 'Blue' });
                blockchain.addBlock({ data: 'Green' });
            })

            describe('and a lastHash reference has changed', () => {
                it('returns false', () => {
                    blockchain.chain[2].lastHash = 'tampered-hash';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            })

            describe('and the chain contains a block with an invalid field', () => {
                it('returns false', () => {
                    blockchain.chain[2].data = 'bad-data';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            })

            describe('and the chain contains a block with a jumped difficulty', () => {
                it('returns false', () => {
                    const lastBlock = blockchain.chain[blockchain.chain.length-1];

                    const lastHash = lastBlock.hash;
                    const timestamp = Date.now();
                    const nonce = 0;
                    const data = [];
                    const difficulty = lastBlock.difficulty - 3;

                    const hash = cryptoHash(timestamp, lastHash, difficulty, nonce, data);

                    const badBlock = new Block({ timestamp, lastHash, hash, nonce, difficulty, data })

                    blockchain.chain.push(badBlock);

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                })
            })

            describe('and the chain does not contain any invalid blocks', () => {
                it('returns true', () => {
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                });
            })
        })
    })

    describe('replaceChain()', () => {
        describe('when the new chain is not longer', () => {
            it('does not replace the chain', () => {
                newChain.chain[0] = { new: 'chain' };
                blockchain.replaceChain(newChain.chain);
                expect(blockchain.chain).toEqual(originalChain);
            })
        });

        describe('when the chain is longer', () => {

            beforeEach(() => {
                newChain.addBlock({ data: 'Red' });
                newChain.addBlock({ data: 'Blue' });
                newChain.addBlock({ data: 'Green' });
            })

            describe('and the chain is invalid', () => {
                it('does not replace the chain', () => {
                    newChain.chain[2].hash = 'fake-hash';
                    blockchain.replaceChain(newChain.chain);
                    expect(blockchain.chain).toEqual(originalChain);
                })
            })

            describe('and the chain is valid', () => {
                it('does replace the chain', () => {
                    blockchain.replaceChain(newChain.chain);
                    expect(blockchain.chain).toEqual(newChain.chain);
                })
            })
        })
    })

});