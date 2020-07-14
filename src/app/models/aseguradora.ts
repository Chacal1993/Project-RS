enum TipoSeguro {
    SALUD = 1,
    FAMILIAR,
    DENTAL,
    VIAJE,
    ESTUDIANTE
}
export interface Aseguradora {
    numTarjeta: string;
    nombre: string;
    tipoSeguro: TipoSeguro;
}