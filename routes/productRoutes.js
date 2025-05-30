const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', (req, res) => {
  res.redirect('/products');
});

//rutas para el publico

router.get('/products', productController.showProducts); // Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
router.get('/products/:productId', productController.showProductById); //Devuelve el detalle de un producto.

//rutas para el administrador

router.get('/dashboard', productController.showDashboard); //Devuelve el dashboard del administrador, En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
router.get('/dashboard/new', productController.showNewProductForm); // Devuelve el formulario para subir un artículo nuevo.
router.get('/dashboard/:productId', productController.showProductById); // Devuelve el detalle de un producto en el dashboard.      
router.get('/dashboard/:productId/edit', productController.showEditProductForm); // Devuelve el formulario para editar un producto.

//crea y actualiza
router.post('/dashboard', productController.createProduct);//Crea un nuevo producto.
router.put('/dashboard/:productId', productController.updateProduct); // Actualiza un producto.

//elimina
router.delete('/dashboard/:productId/delete', productController.deleteProduct); // Elimina un producto.
router.post('/dashboard/:productId/delete', productController.deleteProduct); // Elimina un producto. Usamos POST para evitar problemas con los navegadores que no soportan DELETE en formularios.

module.exports = router;