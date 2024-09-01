const express = require('express');
const planetsRouter = require('./planets.router');
const friendsRouter = require('./friends.router');
const launchesRouter = require('./launches.router');
const api = express();
// ROUTERS
api.use('/planets', planetsRouter);
api.use('/friends', friendsRouter);
api.use('/launches', launchesRouter);

module.exports = {
    api
};