document.addEventListener("DOMContentLoaded", function () {
  const socket = io();

  const addProductos = () => {
    let product = {
      id: document.querySelector("#numID").value,
      producto: document.querySelector("#producto").value,
      precio: document.querySelector("#precio").value
    }

    console.log("producto enviado");
    socket.emit("new-product",product);
    return false;
  }
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    addProductos();
  })

  const render = (data) => {
    let html = data.map(
      (e =>
        `
                <tr>
                    <td class="table-info">${e.id}</td>
                    <td  class="table-success">${e.producto}</td>
                    <td  class="table-danger">${e.precio}</td>   
                  </tr>

                `
    )).join(" ")

    document.querySelector("#products").innerHTML = html;
  };
  socket.on("products",(data) => {
    render(data);
  });

  // socket.on("user_keyup",(data) => {
  //     console.log(data);
  //     productos.push(data);
  //     const template = ejs.compile(myTemplate.innerHTML);
  //     toRender.innerHTML = template({items:productos,title:'Mi primera app Socket'})
  // });

  // inp.addEventListener('keyup',(e)=>{
  //     if(e.keyCode == 13){
  //         socket.emit('keyup',{nombre:e.target.value});
  //         e.target.value = "";
  //     }
  // });
});
