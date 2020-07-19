import { Direccion } from './direccion';
import { Persons } from './persons';

export enum TipoProfesional {
    MEDICO = 1,
    ENFERMERO,
    ADMINISTRATIVO
}
export class Profesional extends Persons {
    numColegiado: string;
    tipoProfesional: TipoProfesional;
}