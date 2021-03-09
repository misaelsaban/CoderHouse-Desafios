import express, {Application, Request, Response} from 'express'
import path from 'path'
import { RouterProductos } from './routes/ProductosRoute';
import { RouterCarrito } from './routes/CarritoRoute';
import { IProd, Producto } from './models/Productos'
import { Carrito } from './models/Carrito'

const app:Application = express()


//Administrador
export const administrador: boolean = true

export let opsProd = new Producto()
export let opsCart = new Carrito()

let puerto = process.env.port || 8080;
app.use('/api', express.static(__dirname + '/public')); //Al principio
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/productos', RouterProductos);
app.use('/carrito', RouterCarrito);


app.listen(puerto, ()=> {
    console.log('Servidor escuchando en puerto 8080')
     
}).on("error", (err: any)=>{
    console.log(err)
})
