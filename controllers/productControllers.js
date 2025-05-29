//product controllers

const {Product} = require ("./models/Product")


//Devolver vista de todos los productos:

exports.showProducts = async (req, res) => {
  try {
    const product = await Product.find(req.body);
  }catch (error) {
    res.status(500).render("error", {error :"Error al cargar el producto"})
  }
}

// vista del detalle del producto
exports.showProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId); // Busca producto por id
    if (!product) return res.status(404).render('error', { error: 'Producto no encontrado' });
    res.render('productDetail', { product });
  } catch (error) {
    res.status(500).render('error', { error: 'Error al mostrar el producto' });
  }
};

// Ver formulario para subir producto
//Crear el nuevo producto
//Editar producto
// Actualizar el producto
//Eliminar producto



// devolver la vista de todos los productos

/*
    async showProductById(req, res) {
        try {   
            const {id} = req.params;
            const product = await Product.findById(id);
                    
            if (!product) return res.status(404).send("Producto no encontrado");

            const fromDashboard = req.originalUrl.incluides ('/dashboard');

            res.render ('products/show', {
              product,
              fromDashboard
            })
            
        } catch (error) {
            console.error('Error al encontrar el producto:', error);
            res.status(500).send({ message: 'Error del servidor' });
       }
    }
};

module.exports = productController;*/

