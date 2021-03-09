import fs from 'fs';
import path from 'path';

export interface IProd{  
    //Propiedades
    id?: number 
    timestamp: Date 
    nombre:string
    descripcion: string
    codigo: number
    foto:string
    precio:number
    stock:number    
}

interface IProducto{  
    //Propiedades
    productos:IProd[]
    rutaArchivo: string
    //Metodos
    addProduct(producto: IProd): void;
    showProducts(): void;
    updateProducts(idProd: number, nombre:string, descripcion: string, codigo: number, foto:string, precio:number, stock:number): void;
    deleteProduct(idProd: number):void
}

export class Producto implements  IProducto{
    productos:IProd[] = []
    rutaArchivo = path.join(__dirname, '../') + 'public';

    addProduct = async (producto: IProd) => {
        try{
            this.productos = await this.showProducts();
            if (this.productos.length == 0){
                producto.id = 1
            }else{
                let ultIdProd:any = this.productos[this.productos.length - 1]!.id;
                producto.id = ultIdProd + 1; 
            }           
            
            this.productos.push(producto) 
            
            const data = await fs.promises.writeFile(path.resolve(this.rutaArchivo, 'productosBD.txt'), JSON.stringify(this.productos))
            console.log("Archivo Guardado")
        }catch(error){
            let reqPath = path.join(__dirname, '../');
            const rutaArchivotxt = reqPath + 'public'
            console.error(path.resolve(rutaArchivotxt, 'productosBD.txt'))
            console.error(error)
            throw error
        }
    }

    showProducts = async () => {
        const data = await fs.promises.readFile(path.resolve(this.rutaArchivo, 'productosBD.txt'), { encoding: 'utf8' })
        if(data.length > 0){
            let arrayMsj:[] = JSON.parse(data);
            let listaProductos:IProd[] = arrayMsj.map((val: any) => <IProd>{
                id: val.id,
                timestamp: val.timestamp,
                nombre: val.nombre,
                descripcion: val.descripcion,
                codigo: val.codigo,
                foto: val.foto,
                precio: val.precio,
                stock: val.stock,
            });
            return listaProductos;
        }else{
            return [];
        }      
    }

    updateProducts = async (idProd: number, nombre:string, descripcion: string, codigo: number, foto:string, precio:number, stock:number) => {
        try{
            this.productos = await this.showProducts();
            const productSelecc =  this.productos.find(x => x.id === idProd)        
            const timestamp = new Date(Date.now())

            productSelecc!.timestamp = timestamp
            productSelecc!.nombre = nombre
            productSelecc!.descripcion = descripcion
            productSelecc!.codigo = codigo            
            productSelecc!.foto = foto	
            productSelecc!.precio = precio // -- !validar null o undefined 
            productSelecc!.stock = stock

            const data = await fs.promises.writeFile(path.resolve(this.rutaArchivo, 'productosBD.txt'), JSON.stringify(this.productos))
            console.log("Archivo Actualizado")

        }catch(error){
            throw error
        }
    }

    deleteProduct = async (idProd: number) => {
        try{
            this.productos = await this.showProducts();
            
            //this.productos = this.productos.splice(idProd, 1);
            this.productos = this.productos.filter(x => x.id !== idProd);
            const data = await fs.promises.writeFile(path.resolve(this.rutaArchivo, 'productosBD.txt'), JSON.stringify(this.productos))
            console.log("Producto Eliminado")

        }catch(error){
            throw error
        }
    }
}