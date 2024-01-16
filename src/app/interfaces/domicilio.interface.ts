export interface Domicilio {
    id: number;
    calle: string;
    numeroExterior: string;
    numeroInterior: string;
    codigoPostal: string;
    // Datos de la relacion con la tabla localidad de INEGI AGEEML Octubre 2020
    localidad:  number;
}