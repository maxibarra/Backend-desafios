
const express = require("express");
const fs = require("fs");
const items = require("./productos.json");



const app = express();
const server = app.listen(3000, () => {
  console.log("escuchando en el puerto 3000");
});

app.get("/", (req, res) => {
  res.send("Hola!");
});
app.get("/api/productos/listar", (req, res) => {

  fs.promises
    .readFile("./productos.json")
    .then((data) => data.toString("utf-8"))
    .then((datos) => {
      res.send(datos);
    });
});

app.get("/api/productos/listar/:id", (req, res) => {

  if (!items[req.params.id]) {
    res.json("producto no encontrado");
  } else {
    res.send(items[req.params.id]);
  }

});

app.post("/api/productos/guardar", (req, res) => {

  try {
    const item = req.body;
    item.name = req.body.name;
    item.precio = req.body.precio;
    item.thumbnail = req.body.thumbnail;
    item.id = items.length + 1;

    fs.promises.readFile("./productos.json").then((data) => {
      let datos = Json.parse(data);
      datos.push(item);
      fs.promises.writeFile("./productos.json", Json.stringify(datos), "utf-8");
    });
    return res.status(200).json(item);
  } catch (error) {
    return res.status(400).json({ error: "error al ingresar producto" });
  }

});
