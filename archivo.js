const fs = require("fs");

class Archivo {

  constructor(file) {
    this.file = file;
  }

  async guardar(producto) {
    try {
      console.log("agregado con exito");
      const data = await fs.promises.readFile(this.file);
      const json = JSON.parse(data.toString("utf-8"));
      json.push({ ...producto, id: json.length });
      try {
        await fs.promises.writeFile(
          this.file,
          JSON.stringify(json, null, "\t")
        );
      } catch {
        throw new Error(err);
      }
    } catch (err) {
      console.log([]);
      try {
        await fs.promises.writeFile(
          this.file,
          JSON.stringify([{ ...producto, id: 0 }])
        );
      } catch (err) {
        throw new Error(err);
      }
    }
  }
   
  existe(){
    return fs.existsSync(this.file);
  }

  borrar(){
    try{
        await fs.promises.unlink("./productos.json");
        console.log("borrado exitoso");
    }
    catch(err){
        throw new Error(err);
    }
  }

}


// borrar();
let myArchivo = new Archivo("./productos.json");
myArchivo.guardar({
  name: "monitor",
  precio: "135500",
  thumbnail: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.muycomputer.com%2F2020%2F05%2F22%2Fmonitores-guia-de-compra%2F&psig=AOvVaw3RPHzMZLw-f2zay0l-sxvf&ust=1629185208407000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNij9YSCtfICFQAAAAAdAAAAABAD"
});
