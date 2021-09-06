const express = require("express");
// const app = express();
const router = express.Router();
const fs = require("fs");


router.get('',(req,res)=>{

    fs.promises
  .readFile("./productos.json")
  .then((data) => data.toString("utf-8"))
  .then((datos) => {
    res.send(datos);
  });

});

  router.get("/productos/listar/:id",(req,res) => { 
  fs.promises
  .readFile("./productos.json")
  .then((datos) => {  
    if (!datos[req.params.id]) {
      res.json("producto no encontrado");
    } else {
      res.send(datos[req.params.id]);
    }
      });

  });
  
  router.get("/productos/guardar", (req, res) => {
  
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
  
 router.put("/productos/actualizar/:id",(req,res) =>{
  
      res.send("Esta ruta actualizara el producto " +req.params.id);
  })
  
  router.delete("/productos/delete/:id",(req,res)=>{
    

      try {
          const item = req.body;
          item.name = req.body.name;
          item.precio = req.body.precio;
          item.thumbnail = req.body.thumbnail;
          item.id = items.length - 1;
  
          fs.promises.readFile("./productos.json").then((data) => {

          let datos = Json.parse(data);
          datos.delete(item);
           fs.promises.unlink("./productos.json",Json.stringify(datos),"utf-8")
          });
          res.status(200).json(item)
          // res.send("se ha borrado el item " +req.params.id);
          } catch (error) {
          return res.status(400).json({ error: "error al borrar producto" });
        }
 
    })

    module.exports = router;