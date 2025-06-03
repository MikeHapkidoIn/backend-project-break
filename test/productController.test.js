

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app.js');
const Product = require('../models/Product.js');

const MONGODB_URI_TEST = process.env.MONGODB_URI_TEST || 'mongodb://127.0.0.1:27017/tienda-ropa-test';

beforeAll(async () => {
  await mongoose.connect(MONGODB_URI_TEST);
}, 10000); // timeout 10s

afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  }
});

describe('Product routes', () => {
  let productId;

  beforeEach(async () => {
    const product = new Product({
      name: 'Test Camiseta',
      description: 'Camiseta de prueba',
      price: 19.99,
      category: 'camisetas',
      imageUrl: 'https://via.placeholder.com/150'
    });
    const saved = await product.save();
    productId = saved._id.toString();
  });

  afterEach(async () => {
    await Product.deleteMany();
  });

  it('GET /products debería responder con 200 y HTML', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('<html');
  });

  // ...otros tests idénticos al código anterior
});

  it('GET /products/:productId debería devolver el producto si existe', async () => {
    const res = await request(app).get(`/products/${productId}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Camiseta de prueba');
  });

  it('GET /products/:productId debería devolver 404 si no existe', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/products/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });

  it('POST /products debería crear un nuevo producto y redirigir', async () => {
    const res = await request(app)
      .post('/products')
      .type('form')
      .send({
        name: 'Nuevo Producto',
        description: 'Un producto nuevo',
        price: 25.99,
        category: 'pantalones',
        imageUrl: 'https://via.placeholder.com/200'
      });

    expect(res.statusCode).toBe(302); // redirección tras creación
    const producto = await Product.findOne({ name: 'Nuevo Producto' });
    expect(producto).toBeTruthy();
  });

  it('PUT /products/:productId debería actualizar el producto', async () => {
    const res = await request(app)
      .put(`/products/${productId}?_method=PUT`)
      .type('form')
      .send({
        name: 'Producto Modificado',
        description: 'Actualizado',
        price: 29.99,
        category: 'accesorios',
        imageUrl: 'https://via.placeholder.com/300'
      });

    expect(res.statusCode).toBe(302); // redirección tras update
    const producto = await Product.findById(productId);
    expect(producto.name).toBe('Producto Modificado');
  });

  it('DELETE /products/:productId debería eliminar el producto', async () => {
    const res = await request(app)
      .delete(`/products/${productId}?_method=DELETE`);

    expect(res.statusCode).toBe(302); // redirección tras delete
    const producto = await Product.findById(productId);
    expect(producto).toBeNull();
  });

