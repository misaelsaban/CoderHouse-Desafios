export class Suma{
    
    private num1: number;
    private num2: number;

    constructor(numero1: number, numero2: number){
        this.num1 = numero1;
        this.num2 = numero2;        
    }

    public resultado(){
        return this.num1 + this.num2;
    }

}