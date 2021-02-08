const express = require('express')
const Producto = require('./productclass.js')
const app = express()
const server = app.listen('8080',()=>{
    console.log(`Servidor en puerto ${server.address().port}`)
})
server.on ("error", error=> console.log(`Error en servidor ${error}`))
app.use(express.json())
var listado=[];
var msgError=JSON.stringify({error : 'producto no encontrado'});
app.get('/api/productos',(req,res)=>{
    if (!listado.length){
        res.send(msgError)
        res.sendStatus(404)
    }
    res.send(listado);
})
app.get('/api/productos/:id',(req,res)=>{
    console.log(req.params.id)
    if(req.params.id>listado.length){
        res.send(msgError)
    }
    else{
        res.send(JSON.stringify(listado[req.params.id]))
    }
})
app.post('/api/productos',(req,res)=>{
    var nuevoProducto=new Producto(...Object.values(req.body))
    nuevoProducto.addProduct();
    listado.push(nuevoProducto);
    res.send(JSON.stringify(nuevoProducto))
})
