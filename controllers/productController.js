const { Product, sizes, categories } = require('../models/Product');
const baseHtml = require('../helpers/baseHtml');
const getNavBar = require('../helpers/getNavBar');
const getProductCards = require('../helpers/getProductCards');
const getProductDetail = require('../helpers/getProductDetails');
const getProductForm = require('../helpers/getEditProductForm');
const getEditProductForm = require('../helpers/getEditProductForm');


const productController = {
  showProducts: async (req, res) => {
  try {
    const category = req.query.cat;
    const products = category
      ? await Product.find({ category })
      : await Product.find();

    const isAdmin = req.originalUrl.startsWith('/dashboard');

    const content = `
    ${getNavBar(isAdmin)}
    <div class="container">
      <h1>Productos</h1>
      ${getProductCards(products, isAdmin)}
    </div>
  `;

  res.send(baseHtml(content));

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar productos');
  }
},
  showProductById: async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    const isAdmin = req.originalUrl.startsWith('/dashboard');

    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

         const content = `
        ${getNavBar(isAdmin)}
        ${getProductDetail(product, isAdmin)}
      `;

      res.send(baseHtml(content));
    } catch (error) {
      console.error('Error al cargar el producto:', error);
      res.status(500).send('Error al cargar el producto');
    }
},
  createProduct: async (req, res) => {
  try {
    const { name, description, category, size, price } = req.body;

    if (!categories.includes(category)) {
      return res.status(400).send('Categoría no válida');
    }

    if (size && !sizes.includes(size)) {
      return res.status(400).send('Talle no válido');
    }

    const image = req.file?.path || req.file?.url || '';

    const priceNumber = Number(price);
    if (isNaN(priceNumber)) {
      return res.status(400).send('Precio no válido');
    }

    const newProduct = new Product({
      name,
      description,
      image,
      category,
      size,
      price: priceNumber
    });

    await newProduct.save();

    res.redirect(`/dashboard/${newProduct._id}`);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).send('Error al crear el producto');
  }
},
showNewProduct: (req, res) => {
  res.send(getProductForm(categories, sizes));
},
  showEditProduct: async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    
    const html = getEditProductForm(product, categories, sizes);
    res.send(html);

  } catch (error) {
    console.error('Error al cargar producto para editar:', error);
    res.status(500).send('Error al cargar producto');
  }
},
 updateProduct: async (req, res) => {
  try {
  
    const productId = req.params.productId;
    const { name, description, imageUrl, category, size, price } = req.body;
    const newImage = req.file?.path || req.file?.url || imageUrl || '';


    const priceNumber = Number(price);
    if (isNaN(priceNumber)) {
      return res.status(400).send('Precio no válido');
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        image: newImage,
        category,
        size,
        price: priceNumber
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send('Producto no encontrado');
    }

    res.redirect('/dashboard'); 
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).send('Error al actualizar producto');
  }
},
  deleteProduct: async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);
    
    if (!deletedProduct) {
      return res.status(404).send('Producto no encontrado');
    }

    // Redirige al listado de productos del dashboard
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).send('Error al eliminar producto');
  }
}

};

module.exports = productController;