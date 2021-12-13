const fs = require('fs');
const data = JSON.parse(
    fs.readFileSync('./productos.json')
);

class Producto{

    async crear(req,res){
        const insertData = req.body;
        insertData.id = data.length;
        data.push(insertData);
        await fs.promises.writeFile('./productos.json',JSON.stringify(data));
        return res.json({producto:'Producto Creado'});
    }

    obtenerTodos(req,res){
        res.json({items:data, cantidad:data.length});

    }

    obtenerPorId(req,res){
        let id = req.params.id;
        let texto = data.find((val)=> id == val.id);
        return res.json( texto ? texto : {error: 'Producto no encontrado'});
    }

    async borrarPorId(req,res){
        let id = req.params.id;
        if(id <= data.length){
            data[id] = {};
            await fs.promises.writeFile('./productos.json',JSON.stringify(data));
            return res.json({respuesta:'Producto Eliminado'});
        }else{
            return res.json({error: 'Producto no encontrado'}); 
        }
    }

    async actualizarPorId(req,res){
        let id = req.params.id;
        data[id] = req.body;
        data[id] = parseInt(id);
        await fs.promises.writeFile('./productos.json',JSON.stringify(data));
        return res.json({producto: 'Producto actualizado correctamente'});
    }
}

module.exports = new Producto();