const express = require('express');
const path = require('path');
const planetsRouter = require('./routers/planets.router');
const cors = require('cors');
const app = express();

// CORS MIDDLEWARE
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(planetsRouter);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
}
);
module.exports = app;
