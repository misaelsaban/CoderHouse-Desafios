import operacion from './TSMisaelSaban'

let operaciones = () => {

    operacion(10,15,'suma').then((result) => console.log(`El resultado de la Suma es: ${result}`));
    operacion(10,15,'suma').then((result) => console.log(`El resultado de la Suma es: ${result}`));
    operacion(10,15,'resta').then((result) => console.log(`El resultado de la Resta es: ${result}`));    
    operacion(10,15,'resta').then((result) => console.log(`El resultado de la Resta es: ${result}`));
}

operaciones();