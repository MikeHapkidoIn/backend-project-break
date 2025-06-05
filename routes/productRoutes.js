/*const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/uploadMiddleware');

// Redireccionamiento raíz
router.get('/', (req, res) => {
  res.redirect('/products');
});

// RUTAS PÚBLICAS
router.get('/products', productController.showProducts); 
router.get('/products/:productId', productController.showProductById); 

// RUTAS ADMINISTRACIÓN
router.get('/dashboard', productController.showProducts); 

router.get('/dashboard/new', productController.showNewProduct); 
router.post('/dashboard', upload.single('image'), productController.createProduct); 

router.get('/dashboard/:productId', productController.showProductById); 
router.get('/dashboard/:productId/edit', productController.showEditProduct); 
router.put('/dashboard/:productId', upload.single('image'), productController.updateProduct); 
router.delete('/dashboard/:productId/delete', productController.deleteProduct); 

module.exports = router;*/

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const requireAuth = require('../middlewares/authMiddleware');

// Rutas públicas
router.get('/products', productController.showProducts);
router.get('/products/:productId', productController.showProductById);

// Rutas protegidas (solo accesibles si estás autenticado)
router.get('/dashboard', requireAuth, productController.showDashboard);
router.get('/dashboard/new', requireAuth, productController.showNewProduct);
router.get('/dashboard/:productId', requireAuth, productController.showProductById);
router.get('/dashboard/:productId/edit', requireAuth, productController.showEditProduct);

router.post('/dashboard', requireAuth, productController.createProduct);
router.put('/dashboard/:productId', requireAuth, productController.updateProduct);
router.delete('/dashboard/:productId/delete', requireAuth, productController.deleteProduct);
router.post('/dashboard/:productId/delete', requireAuth, productController.deleteProduct);

module.exports = router;
