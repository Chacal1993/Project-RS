import { Aseguradora } from './aseguradora';
import { Persons } from './persons';

export enum TipoSeguro {
    SALUD = 1,
    FAMILIAR,
    DENTAL,
    VIAJE,
    ESTUDIANTE
}

export class Paciente extends Persons {
    NHC: string;
    listadoAseguradoras: Aseguradora[];
    tipoSeguro: TipoSeguro;
}