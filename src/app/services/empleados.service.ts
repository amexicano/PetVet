import { Injectable } from '@angular/core';
import { Empleado } from '../interfaces/empleado.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  _DATA: Empleado[];

  constructor() {
    this._DATA = [
      {
        nombre: 'Juan',
        primerApellido: 'Perez',
        segundoApellido: 'Alvarez',
        telefono: '1234567890',
        sexo: 1,
        fechaNacimiento: new Date('1990-01-01'),
        fechaIngreso: new Date('2020-01-01'),
        email: 'jpereza@gmail.com',
        rol: 1,
        id: 1,
        activo: true
      },
      {
        nombre: 'Pedro',
        primerApellido: 'Gonzalez',
        segundoApellido: 'Perez',
        telefono: '1234567890',
        sexo: 1,
        fechaNacimiento: new Date('1990-01-01'),
        fechaIngreso: new Date('2020-01-01'),
        email: 'pedro.gp@gmail.com',
        rol: 3,
        id: 2,
        activo: true
      },
      {
        nombre: 'Maria',
        primerApellido: 'Dominguez',
        segundoApellido: 'Perez',
        telefono: '1234567890',
        sexo: 2,
        fechaNacimiento: new Date('1990-01-01'),
        fechaIngreso: new Date('2020-01-01'),
        email: 'mdp900101@outlook.com',
        rol: 2,
        id: 3,
        activo: true
      },
      {
        nombre: 'Jose',
        primerApellido: 'Díaz',
        segundoApellido: 'Díaz',
        telefono: '1234567890',
        sexo: 1,
        fechaNacimiento: new Date('1990-01-01'),
        fechaIngreso: new Date('2020-01-01'),
        email: 'josedd@yahoo.com.mx',
        rol: 3,
        id: 4,
        activo: true
      },
      {
        nombre: 'Luis',
        primerApellido: 'Olvera',
        segundoApellido: 'Pereira',
        telefono: '1234567890',
        sexo: 1,
        fechaNacimiento: new Date('1990-01-01'),
        fechaIngreso: new Date('2020-01-01'),
        email: 'lop190@gmail.com',
        rol: 3,
        id: 5,
        activo: true
      },
      {
        nombre: 'Carlos',
        primerApellido: 'Gonzalez',
        segundoApellido: 'Santos',
        telefono: '1234567890',
        sexo: 1,
        fechaNacimiento: new Date('1990-01-01'),
        fechaIngreso: new Date('2020-01-01'),
        email: 'cargonsa90@hotmail.com',
        rol: 3,
        id: 6,
        activo: true
      },
    ];
  }

  getEmpleados(): Empleado[] {
    return this._DATA;
  }

  eliminarEmpleado(id: number): void {
    this._DATA = this._DATA.filter((empleado) => empleado.id !== id);
  }

  addEmpleado(empleado: Empleado): void {
    empleado.id = this._DATA.length +1
    this._DATA.push(empleado);
    console.table(this._DATA)
  }

  updateEmpleado(empleado: Empleado): void {
    this._DATA = this._DATA.map((e) => {
      if (e.id === empleado.id) {
        return empleado;
      }
      return e;
    });
  }

  getEmpleadoById(id: number): Empleado {
    return this._DATA.find((empleado) => empleado.id === id)!;
  }
}
