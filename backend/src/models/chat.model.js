const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  message: { type: String, required: true },
  patientId: {   type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',  },  // Store the ID of the patient
  doctorId: {  type: mongoose.Schema.Types.ObjectId,
    ref: 'doctor',
 },    // Store the ID of the doctor
//   senderId: { type: String, required: true },     // Store who sent the message
  timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
