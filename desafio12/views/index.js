document.addEventListener("DOMContentLoaded",function() {
    const socket= io(); 
    const inp = document.querySelector("#nombre");
    const Precio = document.querySelector("#precio");
    const myTemplate = document.querySelector("#myTemplate");
    const toRender = document.querySelector("#toRender");
    const productos = [];

    socket.on('message',(data)=>{
        console.log(data);
    });

    socket.on("user_keyup",(data) => {
        console.log(data);
        productos.push(data);
        const template = ejs.compile(myTemplate.innerHTML);
        toRender.innerHTML = template({items: productos,title:'Mi primera app Socket',nombre:productos.nombre,precio:productos.precio})
    }); 

    inp.addEventListener('keyup',(e)=>{
        if(e.keyCode == 13){
            socket.emit('keyup',{nombre:e.target.nombre});
            e.target.nombre = "";
        } 
    });
    
    Precio.addEventListener('keyup',(e)=>{
        if(e.keyCode == 13){
            socket.emit('keyup',{precio:e.target.precio});
            e.target.precio = "";
        } 
    });
});

