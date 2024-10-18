const Chat = require('../../models/chat.model');
const cloudinary = require('cloudinary').v2;

// Fetch all chat messages between a specific patient and doctor
// exports.getAllMessages = async (req, res) => {
//   const { patientId, doctorId } = req.query;

//   try {
//     const messages = await Chat.find({
//       $or: [
//         { patientId, doctorId },
//         { patientId: doctorId, doctorId: patientId }
//       ]
//     }).sort({ timestamp: 1 });

//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch messages' });
//   }
// };

// // Save a new message
// exports.saveMessage = async (data) => {
//   try {
//     const chatMessage = new Chat({
//       message: data.message,
//       patientId: data.patientId,
//       doctorId: data.doctorId,
//       senderId: data.senderId
//     });
//     await chatMessage.save();
//   } catch (error) {
//     console.error('Failed to save message:', error);
//   }
// };

// FOR  API 
// Save a new message
exports.saveMessage = async (req, res) => {
  console.log('Request body:', req.body); // Log incoming data
  const data = req.body;

  try {
    const chatMessage = new Chat({
      message: data.message,
      patientId: data.patientId,
      doctorId: data.doctorId,
      senderId: data.senderId
    });
    await chatMessage.save();
    res.status(200).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error('Failed to save message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
};

// Fetch all messages
exports.getAllMessages = async (req, res) => {
  const { patientId, doctorId } = req.query;
  console.log('Fetching messages for:', patientId, doctorId); // Log query params

  try {
    const messages = await Chat.find({
      $or: [
        { patientId, doctorId },
        { patientId: doctorId, doctorId: patientId }
      ]
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
exports.updateimageSenderId = async (req, res) => {
  try {
    const reqbody = req.body;

    // Find the chat by ID
    const chat = await Chat.findById(reqbody.chatId); 
    if (!chat) {
      return res.status(404).json({ status: 404, success: false, message: "chat not found!" });
    }

    // Function to handle image uploads to Cloudinary
    const uploadImage = async (fileBuffer, folder) => {
      if (fileBuffer) {
        // If the chat has an existing image, delete it from Cloudinary
        if (chat[folder] && chat[folder].public_id) {
          await cloudinary.uploader.destroy(chat[folder].public_id);
        }

        // Upload the new image buffer to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload_stream({ 
          folder: folder, 
          resource_type: 'image' // Specify that this is an image
        }, (error, result) => {
          if (error) {
            throw new Error("Cloudinary upload failed: " + error.message);
          }
          return result;
        }).end(fileBuffer); // End the stream and send the buffer

        // Return the new image details
        return {
          public_id: uploadResponse.public_id,
          url: uploadResponse.secure_url,
        };
      }
      return null; // Return null if no file is provided
    };

    // Check if image file exists in the request
    const imageFile = req.files && req.files['image'] ? req.files['image'][0] : null;

    // Upload the image if it exists
    const newImage = imageFile ? await uploadImage(imageFile.buffer, 'chatImg') : null;

    if (newImage) {
      reqbody.image = newImage; // Update reqbody with new image details
    }

    // Define fields to update
    const fieldsToUpdate = {
      image: reqbody.image // Retain existing image if no new image is uploaded
    };

    // Update the chat profile in the database
    const updatedChat = await Chat.findByIdAndUpdate(
      reqbody.chatId,
      { $set: fieldsToUpdate },
      { new: true }
    );

    // Respond with success
    return res.status(200).json({
      status: 200,
      success: true,
      updateData: updatedChat,
      message: "Chat updated successfully",
    });

  } catch (err) {
    // Handle errors
    return res.status(400).json({ success: false, error: err.message });
  }
};
