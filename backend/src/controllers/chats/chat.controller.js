const Chat = require('../../models/chat.model');

// Fetch all chat messages between a specific patient and doctor
exports.getAllMessages = async (req, res) => {
  const { patientId, doctorId } = req.query;

  try {
    const messages = await Chat.find({
      $or: [
        { patientId, doctorId },
        { patientId: doctorId, doctorId: patientId }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// Save a new message
exports.saveMessage = async (data) => {
  try {
    const chatMessage = new Chat({
      message: data.message,
      patientId: data.patientId,
      doctorId: data.doctorId,
    //   senderId: data.senderId
    });
    await chatMessage.save();
  } catch (error) {
    console.error('Failed to save message:', error);
  }
};
