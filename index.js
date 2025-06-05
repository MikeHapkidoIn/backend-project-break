/*const app = require('./app'); // 
require('dotenv').config();
const dbConnecction = require('./config/db.js');

const PORT = process.env.PORT;
dbConnecction();

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));*/



/*const express = require('express');
const app = express();
require('dotenv').config();
const dbConnecction = require('./config/db.js');
const productRoutes = require('./routes/productRoutes');
const productApiRoutes = require('./routes/productApiRoutes');
const methodOverride = require('method-override');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const PORT = process.env.PORT;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(methodOverride('_method'));
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
  return null;
}));




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', productRoutes);
app.use('/api', productApiRoutes);


dbConnecction();


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));*/

const express = require('express');
const app = express();
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const dbConnection = require('./config/db');  // Importa la conexión

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de sesión
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Rutas
app.use('/', authRoutes);
app.use('/', productRoutes);

// Estáticos
app.use('/css', express.static(__dirname + '/public/css'));

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await dbConnection();  // Espera a que se conecte la BBDD
    app.listen(PORT, () => {
      console.log(`Servidor en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('No se pudo iniciar el servidor:', err.message);
  }
}

startServer();
