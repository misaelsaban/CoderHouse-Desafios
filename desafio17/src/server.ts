import express, {Application, Request, Response} from 'express'
import { RouteProductos } from './routes/Productos';
import path from 'path'
import { IProd, Producto } from './db/db'
import { IChat, ChatMsg } from './db/archivos'

const {sqlite3Connect} =require('./db/sqlite3.db')
const knex = require('knex')(sqlite3Connect)

const app:Application = express()
const handlebars = require('express-handlebars')
const http = require('http').Server(app)
const io = require('socket.io')(http, { autoConnect: false/*, transports: ['websocket']*/ })


export let opsChat = new ChatMsg("chatBD.txt")
export let HistoryMensajesChat:IChat[] = [];
(async () => { 
    opsChat.ChatMessages = await opsChat.getMessages()            
})()


export let opsProd = new Producto()

let puerto = process.env.port || 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api', RouteProductos);
app.use('/api', express.static(__dirname + '/public'));

app.engine("hbs",handlebars({
   extname: ".hbs",
   defaultLayout:"index.hbs",
   layoutsDir: path.resolve(__dirname + '/views/layouts/'),
   partialsDir: path.resolve(__dirname + '/views/partials/')
}))

app.set("views",path.resolve("./src/views/"))
app.set("view engine","hbs")



app.listen(puerto, ()=> {
   console.log('Servidor escuchando en puerto 8080')
}).on("error", (err: any)=>{ //
   console.log("===========================")
   console.log(err.code)
})


io.on('connection', (socket: any) => {
   let idSock = socket.id
   let addedMail = false;
   console.log('A user connected' + socket.id);

   
   //chat
   socket.on('New chatMsg', (data: any) => {
       //Leer data
       const { mail, msg, time } = data  

       //Agregar usuario- asociar correo con socket
       if (!addedMail){
           socket.mail = mail;
       }        

       //Guardar en el archivo txt
       
       const newMsg: IChat = { mail: mail, 
                              time: time, 
                              message: msg  }
       opsChat.addMessage(newMsg)

       //Emit para mostrar en la lista
       io.emit('new message', newMsg);
   });

   //Productos
   socket.on('dataProds', (data: any) => {
       const { title, price, thumbnail } = data  
       const newProduct = { title, price, thumbnail }
       opsProd.addProduct(newProduct)
       io.emit('ProductoAgregado', data);
   });

   socket.on('disconnect', () => {
       console.log(`Disconnected ${idSock}`);
   });
});