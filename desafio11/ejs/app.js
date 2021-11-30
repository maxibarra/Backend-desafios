const express = require ('express');
const app = express();


app.use(express.urlencoded());
app.use(express.json())

const produc = [];

app.get("/",(req,res)=>{

    res.render("index",{produc})
})

app.post("/tabla",(req,res)=>{

    produc.push({...req.body})

res.render("index",{produc})

})

app.use(express.static(__dirname + '/public'));
app.set("views","./views");

app.set("view engine","ejs");
app.listen(3031, () => {
  console.log('escuchando en puerto 3030');
});
