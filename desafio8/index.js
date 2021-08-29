const { json } = require('express');
const express = require('express');
const fs = require("fs");
const items = require('./productos.json')
    // app.use(cors({origin:"*"}));
    // app.use(express.json());
    // app.use(express.text());
// app.use(express.urlencoded({extended:true}));


const app = express();
const server = app.listen(3000,() => {
    console.log('escuchando en el puerto 3000');
});

app.get("/",(req,res)=>{
    res.send("Hola!");
})
app.get('/api/productos/listar',(req,res)=>{

    
fs.promises.readFile('./productos.json').then(data => data.toString('utf-8')).then(datos =>{
      
    res.send(datos);
})
});

app.get('/api/productos/listar/:id',(req,res)=>{
        
    res.send(items[req.params.id]);
})

// app.post('/api/productos/guardar',(req,res)=>{


// })