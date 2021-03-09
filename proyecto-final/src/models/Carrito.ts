import { IProd } from '../models/Productos'
import fs from 'fs';
import path from 'path';

export interface ICart{  
    //Propiedades
    id?: number 
    timestamp: Date 
    producto:IProd    
}

interface ICarrito{  
    //Propiedades
    itemsCarrito:ICart[]
    rutaArchivo: string
    //Metodos
    addItemsCart(carrito: ICart): void;
    showItemsCart(): void;
    deleteItemsCart(idProd: number):void
}

export class Carrito implements  ICarrito{
    itemsCarrito:ICart[] = []
    rutaArchivo = path.join(__dirname, '../') + 'public';

    addItemsCart = async (itemCarrito: ICart) => {
        try{
            this.itemsCarrito = await this.showItemsCart();
            if (this.itemsCarrito.length == 0){
                itemCarrito.id = 1
            }else{
                let ultIdCart:any = this.itemsCarrito[this.itemsCarrito.length - 1]!.id;
                itemCarrito.id = ultIdCart + 1; 
            }           
            
            this.itemsCarrito.push(itemCarrito) 

            const data = await fs.promises.writeFile(path.resolve(this.rutaArchivo, 'carritoBD.txt'), JSON.stringify(this.itemsCarrito))
            console.log("Archivo Guardado")
        }catch(error){
            throw error
        }
    }

    showItemsCart = async () => {
        const data = await fs.promises.readFile(path.resolve(this.rutaArchivo, 'carritoBD.txt'), { encoding: 'utf8' })
        if(data.length > 0){
            let arrayMsj:[] = JSON.parse(data);
            let listaItemsCarrito:ICart[] = arrayMsj.map((val: any) => <ICart>{
                id: val.id,
                timestamp: val.timestamp,
                producto: val.producto
                /*{
                    id: val.producto.id,
                    timestamp: val.producto.timestamp,
                    nombre: val.producto.nombre,
                    descripcion: val.producto.descripcion,
                    codigo: val.producto.codigo,
                    foto: val.producto.foto,
                    precio: val.producto.precio,
                    stock: val.producto.stock
                }*/
            });
            return listaItemsCarrito;
        }else{
            return [];
        }
        return this.itemsCarrito;
    }

    deleteItemsCart = async (idItemCarrito: number) =>{
        try{
            this.itemsCarrito = await this.showItemsCart();
            
            this.itemsCarrito = this.itemsCarrito.filter(x => x.id !== idItemCarrito);
            const data = await fs.promises.writeFile(path.resolve(this.rutaArchivo, 'carritoBD.txt'), JSON.stringify(this.itemsCarrito))
            console.log("Producto Eliminado")

        }catch(error){
            throw error
        }
    }

}