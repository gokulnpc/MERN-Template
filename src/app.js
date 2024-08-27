const express = require('express');
const path = require('path');
const cors = require('cors');

// EXPRESS APP
const app = express();

// ROUTER IMPORTS
const planetsRouter = require('./routers/planets.router');
const friendsRouter = require('./routers/friends.router');
const messagesRouter = require('./routers/messages.router');

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
app.use(express.static(path.join(__dirname, '..', 'public')));
  
// ROUTERS
app.use(planetsRouter);
app.use(friendsRouter);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
}
);

module.exports = app;
