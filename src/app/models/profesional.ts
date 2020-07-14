import { Direccion } from './direccion';

enum TipoProfesional {
    MEDICO = 1,
    ENFERMERO,
    ADMINISTRATIVO
}
export interface Profesional {
    numColegiado: string;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    genero: string;
    fechaNacimiento: Date;
    NIF: string;
    tipoProfesional: TipoProfesional;
    direccion: Direccion;
}