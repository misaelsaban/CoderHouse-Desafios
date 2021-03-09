import express, {Application, Request, Response} from 'express'
import { copyFileSync } from 'fs'
import { IProd, Producto } from '../models/Productos'

import { opsProd, administrador } from '../server'


var router = express.Router()


router.get('/listar/:id?', async (req: Request, res: Response) => {  
    try{
        let product = null
        const id: number = +req.params.id //Viene de la url/1 y el + para parsear a numero

        opsProd.productos = await opsProd.showProducts()
        if (opsProd.productos.length == 0){
            res.status(404).json({error : 'No hay productos cargados'})
        }else{
            if(!req.params.id){
                product =  opsProd.productos;
            }else{
                product =  opsProd.productos.find(x => x.id === id);
                if (product === null)
                    res.status(404).json({error : 'Producto no encontrado'})
            }  
            res.status(200).send(product) 
        } 
        
    }catch(error){
        console.log(error);
        res.status(404).json({error : 'No se pudo obtener el Producto(s) solicitado(s).'});
    }
})

router.post('/agregar', async (req: Request, res: Response) => {  
    try{ 
        if(administrador){
            const { nombre, descripcion, codigo, foto, precio, stock } = req.body  
            const timestamp = new Date(Date.now())
            //Falta validar que vengan todos los parametros              
            const newProduct = { timestamp, nombre, descripcion, codigo, foto, precio, stock }

            await opsProd.addProduct(newProduct)
            res.status(201).send("Producto agregado!")        
        }else{
            res.status(404).json({ error : -1, descripcion: 'ruta: /productos, método: agregar y no autorizada' })
        }
    }catch(error){
        res.status(404).json({error : 'No se pudo agregar el Producto.'})
        console.log(error)
    }
})

router.patch('/actualizar/:id', (req: Request, res: Response) => { 
    try{   
        if(administrador){ 
            const id: number = +req.params.id //Viene de la url/1 y el + para parsear a numero
            
            if (opsProd.productos.length == 0)
                res.status(404).json({error : 'No hay productos cargados'})

            const productSelecc =  opsProd.productos.find(x => x.id === id)        
            if (productSelecc === null)
                res.status(404).json({error : 'Producto no encontrado'})
            
            const { nombre, descripcion, codigo, foto, precio, stock } = req.body  
            opsProd.updateProducts(id, nombre, descripcion, codigo, foto, precio, stock)
            
            res.status(200).json({Respuesta: "Producto Modificado!"})   
        }else{
            res.status(404).json({ error : -1, descripcion: 'ruta: /productos, método: actualizar y no autorizada' })
        }    
    }catch(error){
        res.status(404).json({error : 'No se pudo modificar el Producto.'})
    }
})

router.delete('/borrar/:id', async (req: Request, res: Response) => {  
    try{  
        if(administrador){  
            const id: number = +req.params.id 
            if (opsProd.productos.length == 0)
                res.status(404).json({error : 'No hay productos cargados'})

            const product =  opsProd.productos.find(x => x.id === id)		
            if (product === null)
                res.status(404).json({error : 'Producto no encontrado'})
            
            await opsProd.deleteProduct(id)
            res.status(200).send('Producto Eliminado.')   
        }else{
            res.status(404).json({ error : -1, descripcion: 'ruta: /productos, método: borrar y no autorizada' })
        }
    }catch(error){
        res.status(404).json({error : 'No se pudo eliminar el Producto.'})
    }
})





export const RouterProductos: express.Router = router;