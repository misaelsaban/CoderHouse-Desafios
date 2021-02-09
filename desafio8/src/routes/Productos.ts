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

    if (product === null)
        res.status(404).json({error : 'Producto no encontrado'})

    res.status(200).send(product)
})

router.post('/productos', (req: Request, res: Response) => {  
    try{    
        const { title, price, thumbnail } = req.body
        const newProduct = { title, price, thumbnail }

        opsProd.addProduct(newProduct)
        res.status(201).send("Producto agregado!")  

    }catch(error){
        res.status(404).json({error : 'No se pudo agregar el Producto.'})
    }
})

export const RouteProductos: express.Router = router;