const { Router } = require('express');
const route = Router();
const rutasProducto = require('./productos-rutas');

route.use('/productos',rutasProducto);

module.exports = route;

  