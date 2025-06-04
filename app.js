const express = require('express');
const app = express();
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const methodOverride = require('method-override');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json'); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    console.log('Método override detectado:', req.body._method);
    return req.body._method;
  }
}));
app.use(express.json());

// Rutas
app.use('/', productRoutes);

module.exports = app;