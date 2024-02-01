const express = require('express');
const path = require('node:path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./router/index');
const app = express();

// Asigna un puerto disponible, en caso de que el elegido este ocupado (uso de desarrollo)
const { findAvaliablePort } = require('./controllers/free.port')

dotenv.config({ path: './config.env'})
// Para leer los datos del formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// conectar mongoose  
mongoose.connect(process.env.DB_CONNECTION) 
  .then(conection => {
    console.log('conexion exitosa')
  })
  .catch(err => {
    console.log('error al leer')
  })

// Habilitar pug
app.set('view engine', 'pug');

// Carpeta para las vistas
app.set('views', path.join(__dirname, "./views"));

// Cargar los archivos estaticos en public
app.use(express.static('./public'));


// Definir rutas de la aplicación
app.use('/',routes());

findAvaliablePort(3005).then(port => {
  app.listen(port, () => {
    console.log(`server listing on port http://localhost:${port}`)
  })
})