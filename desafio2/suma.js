"use strict";
exports.__esModule = true;
exports.Suma = void 0;
var Suma = /** @class */ (function () {
    function Suma(numero1, numero2) {
        this.num1 = numero1;
        this.num2 = numero2;
    }
    Suma.prototype.resultado = function () {
        return this.num1 + this.num2;
    };
    return Suma;
}());
exports.Suma = Suma;
