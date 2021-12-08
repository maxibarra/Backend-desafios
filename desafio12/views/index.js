document.addEventListener("DOMContentLoaded",function() {
    const socket= io(); 
    const inp = document.querySelector("#producto");
 
    const myTemplate = document.querySelector("#myTemplate");
    const toRender = document.querySelector("#toRender");
    const productos = [];

    socket.on('products',(data)=>{
        console.log(data);
    });

    socket.on("user_keyup",(data) => {
        console.log(data);
        productos.push(data);
        const template = ejs.compile(myTemplate.innerHTML);
        toRender.innerHTML = template({items:productos,title:'Mi primera app Socket'})
    }); 

    inp.addEventListener('keyup',(e)=>{
        if(e.keyCode == 13){
            socket.emit('keyup',{nombre:e.target.value});
            e.target.value = "";
        }
    });
 
});
