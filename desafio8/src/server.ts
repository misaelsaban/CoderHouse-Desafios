  
import express, {Application, Request, Response} from 'express'
import { RouteProductos } from './routes/Productos';

const app:Application = express()


let puerto = process.env.port || 8080;
app.use(express.json())
app.use(express.urlencoded({extended: true}))




app.use('/api', RouteProductos);

app.listen(puerto, ()=> {
    console.log('Servidor escuchando en puerto 8080')   
})