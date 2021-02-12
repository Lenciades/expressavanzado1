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
const msgError=JSON.stringify({error : 'producto no encontrado'});

router.get('/productos',(req,res)=>{
    if (!listado.length){
        res.status(404).send(msgError)
    }
    else {
        res.send(JSON.stringify(listado))
    }
})
router.get('/productos/:id',(req,res)=>{
    if(req.params.id>=listado.length){
        res.send(msgError)
    }
    else{
        res.send(JSON.stringify(listado[idEncontrado(req.params.id)]))
    }
})
router.post('/productos',(req,res)=>{
    res.send(JSON.stringify(agregaProducto(req.body)))
})

router.put('/productos/:id',(req,res)=>{
    var productoCambiado=new Producto(...Object.values(req.body))
    listado[idEncontrado(req.params.id)]=productoCambiado.replaceId(req.params.id)
    res.send(JSON.stringify(listado[req.params.id]))
})

router.delete('/productos/:id',(req,res)=>{
    res.send(JSON.stringify({title: "Eliminado"}))
    listado[idEncontrado(req.params.id)]={title: "Eliminado"};
})
app.post('/index.html',(req,res)=>{
    res.send(JSON.stringify(agregaProducto(req.body)))
})

function agregaProducto(reqBody){
    let nuevoProducto=new Producto(...Object.values(reqBody))
    let freeId=listado.findIndex((e)=>e.title==="Eliminado")
    if(freeId!=-1){
        nuevoProducto.id=freeId;
        listado[nuevoProducto.id]=nuevoProducto;
    }
    else{
        nuevoProducto.addNextId();
        listado.push(nuevoProducto);
    }
    return nuevoProducto;
}
function idEncontrado(reqId){
    return listado.findIndex((e)=>e.id==reqId);
}