'use strict';

var express = require('express');
var app = express();
var puerto = 8080;
var Routes = require('./rutas');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', Routes);

var server = app.listen(puerto, function () {
  console.log('Servidor inicializado en el puerto ' + server.address().port);
});

server.on('error', function (err) {
  return console.log('Error en servidor ' + err);
});
