const fs = require('fs');
const path = require('path'); 

class Archivo{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }
      
    async leer() {
      try {        
        const data = await fs.promises.readFile(path.resolve(__dirname, this.nombreArchivo), { encoding: 'utf8' })
        return data;
      } catch (error) {
        return [];
      }
    }

    async guardar(File, titulo, precio, foto) {
      try {    
        
        let arrFile = JSON.parse(File); 
        console.log(arrFile)
        let nuevoProducto = { 
                           title: titulo,
                           price: precio,
                           thumbnail: foto,
                           id : arrFile.length + 1
                         };
        
        arrFile.push(nuevoProducto)
        // Borramos el archivo
        fs.writeFile(path.resolve(__dirname, this.nombreArchivo), '', function(){console.log('done')})

        const data = await fs.promises.writeFile(path.resolve(__dirname, this.nombreArchivo), JSON.stringify(arrFile));
        console.log("Archivo Guardado") 

      } catch (error) {
        console.error("No se puedo Guardar el archivo")
        console.error(error)
      }
    }

    borrar() {
        const del = fs.truncate(path.resolve(__dirname, this.nombreArchivo), 0, function(){console.log('done')})
    }
}

let prueba = new Archivo("productos.txt");
let archivo;

(async () => {
  archivo = await prueba.leer();
  console.log(archivo)
  prueba.guardar(archivo, "Mas notebooks",5845.54,"https://http2.mlstatic.com/D_NQ_NP_641105-MLA43915971144_102020-F.webp" );
  //prueba.borrar();
})()