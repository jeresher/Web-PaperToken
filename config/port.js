const DEFAULT_PORT = 5000;
let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === 'true') {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = process.env.PORT || PEER_PORT || DEFAULT_PORT;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`

let REDIS_URL;

if (process.env.NODE_ENV === 'production') {
    REDIS_URL = process.env.REDIS_URL
} else {
    REDIS_URL = "redis://127.0.0.1:6379"    
}

module.exports = {
    PORT,
    DEFAULT_PORT,
    ROOT_NODE_ADDRESS,
    REDIS_URL
}