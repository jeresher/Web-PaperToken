const express = require('express');
const routes = require('./routes/routes');
const app = express();

const DEFAULT_PORT = 3000;
let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === 'true') {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

app.use(express.json());
app.use(routes);

const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => console.log(`Listening at localhost: ${PORT}`))