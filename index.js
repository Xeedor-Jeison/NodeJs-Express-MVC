const express = require('express');
const path = require('node:path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const URI = `mongodb+srv://jeisonjacome:Xjeison1.@cluster0.uz1bpbr.mongodb.net/`
const routes = require('./router/index');
const app = express();
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

app.listen(3000);