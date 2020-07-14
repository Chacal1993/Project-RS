import { Direccion } from './direccion';
import { Aseguradora } from './aseguradora';

export interface Paciente {
    NHC: string;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    genero: string;
    fechaNacimiento: Date;
    NIF: string;
    dirección: Direccion;
    listadoAsegradoras: Aseguradora[];
}