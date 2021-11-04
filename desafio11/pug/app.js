const express = require ('express');
const app = express();
const pug = require("pug");


app.get("/",(req,res)=>{

    res.send("hello");
})

const fs = require("fs");



app.get("/views",(req,res)=>{  

    let tabla = req.query;
    res.render("index",{
      productos:[
        {     
          id:1,
          name: "monitor",
          precio: "$1234",
          imagen:"https://cdn2.iconfinder.com/data/icons/scenarium-vol-1-2/128/009_workspace_workplace_desktop_computer_keyboard_mouse_screen-128.png",
        },
        { 
          id:2,
          name:"mouse",
          precio:"$2345",
          imagen:"https://cdn1.iconfinder.com/data/icons/materia-hardware/24/002_043_mouse_hardware_input_computer-128.png"
        },
        {
          id:3,
          name:"teclado",
          precio:"$34567",
          imagen:"https://cdn1.iconfinder.com/data/icons/software-hardware/200/software-24-128.png"
        },
        {
          id:4,
          name:"silla",
          precio:"$45678",
          imagen:`https://cdn4.iconfinder.com/data/icons/business-conceptual-mixed-set-1/512/2-128.png`
        }
      ]
    })
    tabla
})


app.get("/listar/:id",(req,res) => { 
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
  
  app.get("/guardar", (req, res) => {
  
    try {
      const item = req.body;
      item.name = req.body.name;
      item.precio = req.body.precio;
      item.thumbnail = req.body.thumbnail;
      item.id = item.length + 1;
  
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
  
  app.put("/actualizar/:id",(req,res) =>{
  
      res.send("Esta ruta actualizara el producto " +req.params.id);
  })
  
  app.delete("/delete/:id",(req,res)=>{
      try {
          const item = req.body;
          item.name = req.body.name;
          item.precio = req.body.precio;
          item.thumbnail = req.body.thumbnail;
          item.id = item.length - 1;
  
          fs.promises.readFile("./productos.json").then((data) => {

          let datos = Json.parse(data);
          datos.delete(item);
           fs.promises.unlink("./productos.json",Json.stringify(datos),"utf-8")
          });
          res.status(200).json(item)
          res.send("se ha borrado el item " +req.params.id);
          } catch (error) {
          return res.status(400).json({ error: "error al borrar producto" });
        }
 
    })


app.use(express.urlencoded());
app.use(express.json())
app.use(express.static(__dirname + '/public'));

app.set('views',"./views");
app.set("view engine","pug");

app.listen(3030, ()=> {
    console.log('escuchado en el puerto 3030');
})


