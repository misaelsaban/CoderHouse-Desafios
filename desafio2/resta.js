"use strict";
exports.__esModule = true;
exports.Resta = void 0;
var Resta = /** @class */ (function () {
    function Resta(numero1, numero2) {
        this.num1 = numero1;
        this.num2 = numero2;
    }
    Resta.prototype.resultado = function () {
        return this.num1 - this.num2;
    };
    return Resta;
}());
exports.Resta = Resta;
