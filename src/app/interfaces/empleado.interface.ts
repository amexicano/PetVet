export interface Empleado {
    id: number;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    telefono: string;
    sexo: number;
    fechaNacimiento: Date;
    fechaIngreso: Date;
    email: string;
    rol: number;
    activo: boolean;
}