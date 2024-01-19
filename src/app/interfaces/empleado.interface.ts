import { Rol } from "./rol.interface";
import { Sexo } from "./sexo.interface";

export interface Empleado {
    id: number;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    telefono: string;
    sexo: Sexo;
    fechaNacimiento: Date;
    fechaIngreso: Date;
    email: string;
    rol: Rol;
    activo: boolean;
}