const express = require('express');
const path = require('path');

const app = require('./app');
const PORT = 3000;

// SERVER
async function start() {
    app.listen(PORT, () => {
        console.log('Server is running on http://localhost:3000');
        }
    );
}
start();