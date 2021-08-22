const express = require('express');
const fs = require('fs');
 let contadorItems = 0;
 let contadorRandom = 0;

const app = express();
const server = app.listen(8080,() => {
    console.log('escuchando en el puerto 8080');
});
app.get("/",(req,res)=>{
    res.send("Bienvenidos");
})

app.get('/items',(req,res)=>{

        contadorItems++;
    
    fs.promises.readFile('./productos.json').then(data => data.toString('utf-8')).then(datos =>{
        
        res.send(datos);
    })
});

app.get('/item-random',(req,res)=>{
    
  
    contadorRandom++;

    
    

    let aleatorio = (min,max) =>{

        return Math.floor(Math.random()* (max-min)) + min;
    }

    fs.promises.readFile('./productos.json').then(data => data.toString('utf-8')).then(datos =>{
        
        const json = JSON.parse(datos)

        res.json({item:json[aleatorio(0,json.length-1)]});
    })
})

app.get('/visitas',(req,res)=>{
    res.send(`<p>la cantidad de visitas de item random es de ${contadorRandom},</p><br>
    la cantidad de visitas de item es de ${contadorItems}`); 
});