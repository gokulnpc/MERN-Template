const express = require('express');
const path = require('path');
const cors = require('cors');
const { api } = require('./routers/api');

// EXPRESS APP
const app = express();

// MIDDLEWARES
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

// CORS MIDDLEWARE
app.use(cors({
    origin: 'http://localhost:3000'
}));

// CONFIGURATION
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// STATIC FILES
app.use(express.static(path.join(__dirname, '..', 'public')));

// API
app.use('/v1', api);

// WEBPAGE
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
}
);

module.exports = app;
