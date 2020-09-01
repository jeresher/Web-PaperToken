const express = require('express');
const routes = require('./routes/routes');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`Listening at localhost: ${PORT}`))