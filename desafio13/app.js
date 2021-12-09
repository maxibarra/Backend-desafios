const express = require('express');
const app = express();
const http= require('http').Server(app);
const io = require('socket.io')(http);

const productos = [
    {
        id:1,
        producto:'celular',
        precio:132
    }
];
const mensajes=[
    {
        user:'estapagina@gmail.com',
        text:'en que lo puedo ayudar'
    }
]

app.use(express.static('./views'));


app.get('/',(req,res)=>{

    res.send('index.html');
})
app.get('/mensajes',(req,res)=>{
    res.json(mensajes);
})

app.get('/productos',(req,res)=>{
    res.json(productos);
})

io.on('connection',(socket)=>{
    console.log("cliente conectado:" + socket.id);
        socket.emit('products',productos)

        socket.emit('message',mensajes)

        socket.on('hello',(data,data2)=>{
            console.log(data);
            console.log(data2)
        })

        socket.on('keyup',(data,data2)=>{
            console.log(data);
            io.emit('user_keyup',{...data,id:socket.id})
        
            productos.push({products:data.value,id:socket.id});

            mensajes.push({message:data2.value});
        })

        socket.on('products',(data)=>{

        })
        socket.on('message',(data2)=>{

        })

        socket.on('new-product',(data)=>{
            productos.push(data)
            io.emit("products",productos)
        })
        socket.on('new-message',(data2)=>{
            mensajes.push(data2)
            io.emit("messages",mensajes)
        })
})

app.use(express.urlencoded());
app.use(express.json())
app.set("views","./views");
app.set("view engine","ejs");

http.listen(3030, () => {
  console.log('escuchando en puerto 3030');
});
