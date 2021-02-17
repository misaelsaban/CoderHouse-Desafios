export interface IProd{  
  //Propiedades
  id?: number  
  title:string
  price:number
  thumbnail:string
}


interface IProducto{  
  //Propiedades
  productos:IProd[]
  //Metodos
  addProduct(producto: IProd): void;
  showProducts(): void;
  
}

export class Producto implements  IProducto{
  productos:IProd[] = []


  addProduct(producto: IProd) {
      producto.id = this.productos.length + 1
      this.productos.push(producto) 
      return producto
  }

  showProducts() {
      return this.productos;
  }

    updateProducts(idProd: number, title:string, price:number, thumbnail:string){
      try{

          let productSelecc =  this.productos.find(x => x.id === idProd)        

          productSelecc!.title = title
          productSelecc!.price = price 
          productSelecc!.thumbnail = thumbnail
          return productSelecc

      }catch(error){
          throw error
      }
  }

  deleteProduct(idProd: number){
      try{
          const prod =  this.productos.find(x => x.id === idProd) 
          this.productos.splice(idProd - 1 , 1);
          return prod
          
      }catch(error){
          throw error
      }
  }

}