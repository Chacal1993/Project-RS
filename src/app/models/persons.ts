import { Direccion } from './direccion';

export class Persons {
    _id: string;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    genero: string;
    fechaNacimiento: Date;
    NIF: string;
    direccion: Direccion;
}