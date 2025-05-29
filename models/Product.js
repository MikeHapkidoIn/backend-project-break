//Productos

const mongoose = require("mongoose");

const size = ["XS", "S", "M", "L", "XL"]
const productos = ["Camisetas", "Pantalones", "Zapatos", "Accesorios"]


const ProductSchema = new mongoose.Schema ({
  Nombre: {
    type :String,
    required:true,
  },
  Descripcion:{
    type: String
  },
  Precio: {
    type: Number,
    required : true,
    min: 0, // esto es porque el precio no puede ser negativo-Minimo 0 euros
  },
  imagen:{
    type :String
  },  // aqui hay que meter la url de la imagen de cloudynary,
  
  Categoria : {
    type: String,
    required: true,
    enum: product
  },  
  Tallas:{
    type : String,
    required : true,
    enum: size    
  },
},

{timestamps: true,}
)
  
  
 



module.exports = {
  Product: mongoose.model('Product', ProductSchema),
  size,
  productos
};
