const express = require('express');
const router = express.Router();
const ChatController = require('../../../controllers/chats/chat.controller');
const multer = require('multer');
const authenticDoctor = require("../../../middlewares/doctorAuth");

// Fetch all messages
router.post('/get-all', ChatController.saveMessage);

router.get('/get-all-sms', ChatController.getAllMessages);

const storage = multer.memoryStorage(); // Use memory storage for direct upload to Cloudinary
const upload = multer({ storage: storage });

router.put(
  '/update-image',  
  // authenticDoctor,
  upload.fields([
    { name: 'image', maxCount: 1 }, // Field name for doctor's image
  ]),
  ChatController.updateimageSenderId // Controller function to handle the update
);

module.exports = router;