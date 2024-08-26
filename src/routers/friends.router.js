const express = require('express');
const friendsController = require('../controllers/friends.controller');

const friendsRouter = express.Router();

// MIDDLEWARES
friendsRouter.use((req, res, next) => {
    console.log("Friends router middleware");
    next();
});


// ROUTES
friendsRouter.get('/', friendsController.getFriends);
friendsRouter.get('/bale', friendsController.getBale); // Sending a file

module.exports = friendsRouter;