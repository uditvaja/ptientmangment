const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dqycnyvbq', // Replace with your Cloudinary cloud name
  api_key: '569255476534565',       // Replace with your Cloudinary API key
  api_secret: 'SBNkjD1E9pgaS9lkJWJMS8gCNwo'  // Replace with your Cloudinary API secret
});

module.exports = cloudinary;
