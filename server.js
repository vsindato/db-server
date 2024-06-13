// server.js
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 4000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Welcome route
app.get('/', (req, res) => {
    res.send('hello world!');
});

// In-memory data-store
const dataStore = {};

// Store key-value pair in in-memory store
app.get('/set', (req, res) => {
    const somekey = Object.keys(req.query)[0];
    const somevalue = req.query[somekey];
    if (somekey && somevalue) {
        dataStore[somekey] = somevalue;
        res.send(`The value stored at ${somekey} = ${somevalue}`);
    } else {
        res.status(400).send('somekey or somevalue was not provided');
    }
});


// Get the stored value for a key
app.get('/get', (req, res) => {
    const { key } = req.query;
    if (key) {
        const value = dataStore[key];
        if (value) {
            res.send(`Value for ${key} is ${value}`);
        } else {
            res.status(404).send(`Key ${key} not found`);
        }
    } else {
        res.status(400).send('Missing key');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

