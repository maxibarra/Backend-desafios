const  { Router } = require('express');
const Producto = require('../servicios/productos');
const route = Router();

route.get('/',Producto.obtenerTodos);
route.get('/:id',Producto.obtenerPorId);
route.post('/',Producto.crear);
route.delete('/:id',Producto.borrarPorId);
route.put('/:id',Producto.actualizarPorId);


module.exports = route;