//middleware

// middlewares/uploadMiddleware.js
const multer = require('multer');
const { storage } = require('../config/cloudinary');

const upload = multer({ storage });

module.exports = upload;
