const express = require('express');
const messagesController = require('../controllers/messages.controller');
const messagesRouter = express.Router();

messagesRouter.get('/', (req, res) => {
    messagesController.getMessages(req, res);
}
);
module.exports = messagesRouter;

