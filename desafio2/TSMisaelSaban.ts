 const operacion = async (num1: number, num2: number, textoOperacion: string) => {

    switch (textoOperacion){

        case "suma": { 
            let classSuma = await import('./suma');
            let sumando = new classSuma.Suma(num1, num2);

            return new Promise((res,rej) => {
                res(sumando.resultado());
            });
        }
        case "resta": {  
            let classResta = await import('./resta');
            let restando = new classResta.Resta(num1, num2);

            return new Promise((res,rej) => {
                res(restando.resultado());
            });
            
        }        
    }
 }


export default operacion;