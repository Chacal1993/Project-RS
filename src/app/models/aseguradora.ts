enum TipoSeguro {
    SALUD = 1,
    FAMILIAR,
    DENTAL,
    VIAJE,
    ESTUDIANTE
}
export class Aseguradora {
    numTarjeta: string;
    nombreAseguradora: string;
    tipoSeguro: TipoSeguro;
}