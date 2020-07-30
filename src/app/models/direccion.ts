export class Direccion {
    calle: string;
    numero: string;
    puerta: string;
    codigoPostal: string;
    ciudad: string;

    constructor(calle: string, numero: string, puerta: string, codigoPostal: string, ciudad: string) {
        this.calle = calle;
        this.numero = numero;
        this.puerta = puerta;
        this.codigoPostal = codigoPostal;
        this.ciudad = ciudad;
    }

}