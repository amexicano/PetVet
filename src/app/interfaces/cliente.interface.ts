import { Domicilio } from "./domicilio.interface";
import { Sexo } from "./sexo.interface";

export interface Cliente {
    id: number;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    telefonoFijo: string;
    telefono: string;
    sexo: Sexo;
    email: string;
    curp: string;
    domicilio: Domicilio;
}