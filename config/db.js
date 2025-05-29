//configuracion bases de datos

require('dotenv').config(); 

const mongoose = require('mongoose'); //Importa mongoose para manejar mongoDB

const dbConnection = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI) 
      console.log("Conectado con MongoDB")
    
  }catch (error) {
    console.error ("Error al conectar con la base de datos", error.message)
  }
}

module.exports = dbConnection