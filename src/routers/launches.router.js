const express = require('express');
const { httpAddNewLaunch, httpGetAllLaunch, httpAbortLaunch } = require('../controllers/launches.controller');
const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunch);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter;