const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chat.controller');

// Fetch all messages
router.get('/', ChatController.getAllMessages);

// Save a new message
router.post('/', (req, res) => {
  ChatController.saveMessage(req.body);
  res.status(201).send('Message saved');
});

module.exports = router;
