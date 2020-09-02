const express = require('express');
const routes = require('./routes/routes');
const { PORT } = require('./config/port');
const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`Listening at localhost: ${PORT}`))