const express = require("express");
const shortid = require("shortid");
const generate = shortid.generate;

const app = express();

// app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(5000, () => console.log('API running on port 5000'));
