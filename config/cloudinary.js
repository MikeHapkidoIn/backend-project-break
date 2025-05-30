// config/cloudinary.js
const cloudinary = require('cloudinary').v2;
const { almacenamientoCloudinary } = require('multer-storage-cloudinary');

// Carga las variables desde .env
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configurar multer para que almacene en Cloudinary
const almacenamiento = new almacenamientoCloudinary({
  cloudinary,
  params: async (req, file) => {
    // Aquí puedes usar la categoría desde el formulario para crear carpetas
    const category = req.body.category || 'generico';
    return {
      folder: `amason/${category}`,  // Subirá a cloudinary/amason/categoria/
      allowed_formats: ['jpg', 'jpeg', 'png'],
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    };
  }
});

module.exports = {
  cloudinary,
  storage
};
