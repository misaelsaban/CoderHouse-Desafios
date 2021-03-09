import express, {Application, Request, Response} from 'express'
import { copyFileSync } from 'fs'
import { IProd } from '../models/Productos'
import { opsCart, opsProd } from '../server' 

var router = express.Router()


router.get('/listar/:id?', async (req: Request, res: Response) => {  
    try{        
        let carrito = null
        const id: number = +req.params.id //Viene de la url/1 y el + para parsear a numero

        opsCart.itemsCarrito = await opsCart.showItemsCart()
        if (opsCart.itemsCarrito.length == 0){
            res.status(404).json({error : 'No hay items cargados en el carrito'})
        }else{
            if(!req.params.id){
                carrito =  opsCart.itemsCarrito;
            }else{
                carrito =  opsCart.itemsCarrito.find(x => x.id === id);
                if (carrito === null)
                    res.status(404).json({error : 'Item no encontrado'})
            } 
            res.status(200).send(carrito)    
        }   
    }catch(error){
        res.status(404).json({error : 'No se pudo obtener el listado de Items del Carrito.'})
    }
})

router.post('/agregar/:id_producto', async (req: Request, res: Response) => {  
    try{    
        const idProducto: number = +req.params.id_producto //Viene de la url/1 y el + para parsear a numero
        const producto: IProd = opsProd.productos.find(x => x.id === idProducto)!
        
        if (producto === null || typeof producto === 'undefined'){
			res.status(404).json({error : 'Producto no encontrado, no se puede agregar al Carrito.'})
        }else{ 
            const timestamp = new Date(Date.now())
            //Falta validar que vengan todos los parametros              
            const newItem = { timestamp, producto }

            await opsCart.addItemsCart(newItem)
            res.status(201).send("Producto agregado al Carrito!")        
        }
    }catch(error){
        res.status(404).json({error : 'No se pudo agregar el Producto al Carrito.'})
        console.log(error)
    }
})

router.delete('/borrar/:id', async (req: Request, res: Response) => {  
    try{    
        const idItemCarrito: number = +req.params.id 
        if (opsCart.itemsCarrito.length == 0)
            res.status(404).json({error : 'No hay productos cargados al Carrito'})

		const product =  opsCart.itemsCarrito.find(x => x.id === idItemCarrito)		
		if (product === null)
			res.status(404).json({error : 'Item no encontrado'})
		
            await opsCart.deleteItemsCart(idItemCarrito)
        res.status(200).send('Producto Eliminado del Carrito.')   
    }catch(error){
        res.status(404).json({error : 'No se pudo eliminar el Producto del Carrito.'})
    }
})

export const RouterCarrito: express.Router = router;