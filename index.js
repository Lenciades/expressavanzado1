const express = require('express')
const app = express()
const router=express.Router()
const Producto=require('./productclass')
const server = app.listen('8080',()=>{
    console.log(`Servidor en puerto ${server.address().port}`)
})
server.on ("error", error=> console.log(`Error en servidor ${error}`))
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api',router)
var listado=[];
var msgError=JSON.stringify({error : 'producto no encontrado'});
router.get('/productos',(req,res)=>{
    if (!listado.length){
        res.send(msgError)
        res.sendStatus(404)
    }
    res.send(JSON.stringify(listado));
})
router.get('/productos/:id',(req,res)=>{
    if(req.params.id>listado.length){
        res.send(msgError)
    }
    else{
        res.send(JSON.stringify(listado[req.params.id]))
    }
})
router.post('/productos',(req,res)=>{
    res.send(JSON.stringify(agregaProducto(req.body)))
})
router.put('/productos/actualizar/:id',(req,res)=>{
    var cambioProducto=new Producto(...Object.values(req.body))
    listado[req.params.id]=cambioProducto.changeProduct(req.params.id)
    res.send(JSON.stringify(listado[req.params.id]))
})
app.post('/index.html',(req,res)=>{
    res.send(JSON.stringify(agregaProducto(req.body)))
})
router.delete('/productos/borrar/:id',(req,res)=>{
    res.send(JSON.stringify(listado[req.params.id])+` BORRADO`)
    listado[req.params.id]={};
})
function agregaProducto(reqBody){
    var nuevoProducto=new Producto(...Object.values(reqBody))
    nuevoProducto.addProduct();
    listado.push(nuevoProducto);
    return nuevoProducto;
}
