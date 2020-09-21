const DEFAULT_PORT = 5000;
let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === 'true') {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = process.env.PORT || PEER_PORT || DEFAULT_PORT;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`

let REDIS_URL;

if (process.env.NODE_ENV === 'production') {
    REDIS_URL = "redis://h:paccb89227b75571290e81236c1df42b2007aae99f12c199e05eb82a0eb62c097@ec2-34-228-121-196.compute-1.amazonaws.com:12439"
} else {
    REDIS_URL = "redis://127.0.0.1:6379"    
}

module.exports = {
    PORT,
    DEFAULT_PORT,
    ROOT_NODE_ADDRESS,
    REDIS_URL
}