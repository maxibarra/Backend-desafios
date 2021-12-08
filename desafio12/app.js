const express = require('express');
const app = express();
const http= require('http').Server(app);
const io = require('socket.io')(http)

const productos = [];

app.use(express.static('./views'));

app.get('/',(req,res)=>{

    res.send('index.html');
})

app.get('/productos',(req,res)=>{

    res.json(productos);

})

io.on('connection',(socket)=>{
    console.log("cliente conectado:" + socket.id);
        socket.emit('products',{productos})

        socket.on('hello',(data)=>{
            console.log(data);
        })

        socket.on('keyup',(data)=>{
            console.log(data);
            io.emit('user_keyup',{...data,id:socket.id})
        
            productos.push({products:data.value,id:socket.id});
        })
})

app.use(express.urlencoded());
app.use(express.json())
app.set("views","./views");
app.set("view engine","ejs");

http.listen(3030, () => {
  console.log('escuchando en puerto 3030');
});
