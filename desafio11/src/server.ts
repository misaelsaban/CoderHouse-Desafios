import express, {Application, Request, Response} from 'express'
import { RouteProductos } from './routes/Productos';
import path from 'path'

const app:Application = express()

let puerto = process.env.port || 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api', RouteProductos);
app.use('/api', express.static(__dirname + '/public'));

app.set("views",path.resolve("./src/views/"))
app.set("view engine","ejs")


app.listen(puerto, ()=> {
   console.log('Servidor escuchando en puerto 8080')
}).on("error", (err: any)=>{
   console.log("===========================")
   console.log(err.code)
})