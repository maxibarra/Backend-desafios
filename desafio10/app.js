const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const productRouter = require("./rutas/productos.route");
const PORT = 8080;


app.use('/productos',productRouter);

app.use(express.static("public"));
app.set("views","./views");
app.set("view engine","hbs");

app.listen(PORT,()=>{
    console.log("Nuestro server esta en el puerto" + PORT)
});

app.engine("hbs",handlebars(
    {
        extname:".hbs",
        defaultLayout:"index.hbs",
        layoutsDir: __dirname + "/views/layouts"
    }
));



