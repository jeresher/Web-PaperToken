const DEFAULT_PORT = 5000;
let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === 'true') {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`


module.exports = {
    PORT,
    DEFAULT_PORT,
    ROOT_NODE_ADDRESS
}