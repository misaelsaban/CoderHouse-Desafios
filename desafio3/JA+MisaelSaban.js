
const splitTexto = async (texto,callback,frecuencia=1)=>{
    let palabras = texto.split(' ');
    let index = 0;
    let loop;
    return new Promise((resolve , reject )=>{
      loop = setInterval(()=>{
        if(index>=palabras.length){
          clearInterval(loop)
          let resp = callback(palabras)
          resolve(resp);
        }else{
          console.log(palabras[index]);
          index++
        }
      },frecuencia*1000)
    })
  }

  const endFunction = (palabras) => {
    return `proceso completado, palabras totales: ${palabras.length}`
  }

  const llamadas = async()=>{
    console.log(await splitTexto('Hola mundo',endFunction,1));
    console.log(await splitTexto('Este es un Hola Mundo',endFunction,0.8));
    console.log(await splitTexto('Este es un hola mundo mas largo',endFunction,0.5));
  }
  llamadas();