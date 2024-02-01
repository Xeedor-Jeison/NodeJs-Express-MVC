const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController')


module.exports = ()=>{
  router.get('/',urlController.home);
  router.post('/', urlController.agregarUrl);

  // Generar una url Comodin
  router.get('/:url', urlController.redireccionarUrl)

  return router
}