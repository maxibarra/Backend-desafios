const express = require("express");
// const multer = require("multer");
const app = express();
// const router = express.Router();
const api = require("./rutas/productos.route");

// app.get('',(req, res) => {
//     res.send("esta ruta trae todos los productos");
//   });
// router.get('',(req, res) => {
//         res.send("hola");
//       });


// let storage = multer.diskStorage({
//     destination:function(req,file,callback){
//         callback(null,"uploads");

//     },
//     filename:function(req,file,callback){
//         callback(null,file.originalname+"-"+Date.now())
//     }
// })

// let upload = multer({storage});

// app.get('/error',(req,res,next)=>{

//     // return next(new Error('Error...'));
//     res.status(500);
//     res.render('error',{error:err}); 
// })

// app.post('/upload',upload.single('MiArchivo'),(req,res,next)=>{

//     if (!req.file){
//         const error = new Error("Sin archivos");
//         error.httpStatusCode = 400;
//         return next(error)
//     }
//     res.send(req.file);
// })


// app.post('/multipleUpload',upload.array('MisArchivos',12),(req,res,next)=>{
//     if(!req.files)
//     {
//         const error = new Error("Sin archivos");
//         return next(error)
//     }
//     res.send(req.files)
// })

// app.use((req,res,next)=>{
//  console.log('Middleware a nivel de App');
//  next();   
// })


app.use('/api',api);

app.use(express.static('public'));
app.listen(8080, () => {
    console.log("puerto 8080");
  });

