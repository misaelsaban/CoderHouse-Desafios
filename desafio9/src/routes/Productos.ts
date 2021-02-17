import express, {Application, Request, Response} from 'express'
import { IProd, Producto } from '../db'

var router = express.Router()
let opsProd = new Producto()

router.get('/productos', (req: Request, res: Response) => {  
    const products =  opsProd.showProducts()
    if (products.length == 0){
        res.status(404).json({error : 'No hay productos cargados'})
    }
    res.status(200).send(products)
})

router.get('/productos/:id', (req: Request, res: Response) => {

    const id: number = +req.params.id 
    const product =  opsProd.productos.find(x => x.id === id)

    if (opsProd.productos.length == 0)
        res.status(404).json({error : 'No hay productos cargados'})

    if (product === null || product === undefined)
        res.status(404).json({error : 'Producto no encontrado'})

    res.status(200).send(product)
})

router.post('/productos', (req: Request, res: Response) => {  
    try{    
        const { title, price, thumbnail } = req.body
        const newProduct = { title, price, thumbnail }

        const prodAdded = opsProd.addProduct(newProduct)
        //res.status(201).send("Producto agregado!")  
        res.status(201).json(prodAdded)  

    }catch(error){
        res.status(404).json({error : 'No se pudo agregar el Producto.'})
    }
})

router.patch('/productos/actualizar/:id', (req: Request, res: Response) => { 
    try{    
        const id: number = +req.params.id //Viene de la url/1 y el + para parsear a numero
        
        if (opsProd.productos.length == 0)
            res.status(404).json({error : 'No hay productos cargados'})

        const productSelecc =  opsProd.productos.find(x => x.id === id)        
		if (productSelecc === null || productSelecc === undefined)
			res.status(404).json({error : 'Producto no encontrado'})
        
        const { title, price, thumbnail } = req.body  
        
        const pro = opsProd.updateProducts(id, title, price, thumbnail)
        
        res.status(200).json(pro)   
        
        
    }catch(error){
        res.status(404).json({error : 'No se pudo modificar el Producto.'})
    }
})

router.delete('/productos/borrar/:id', (req: Request, res: Response) => {  
    try{    
        const id: number = +req.params.id 
        if (opsProd.productos.length == 0)
            res.status(404).json({error : 'No hay productos cargados'})

		const product =  opsProd.productos.find(x => x.id === id)		
		if (product === null || product === undefined)
			res.status(404).json({error : 'Producto no encontrado'})
		
        const pro  = opsProd.deleteProduct(id)
        res.status(200).json(pro)   

    }catch(error){
        res.status(404).json({error : 'No se pudo eliminar el Producto.'})
    }
})
export const RouteProductos: express.Router = router;