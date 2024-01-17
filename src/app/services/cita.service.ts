import { Injectable } from '@angular/core';
import { Cita } from '../interfaces/cita.interface';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  _DATA!: Cita[]
  constructor() { 
    this._DATA = [
      {
        id: 1,
        fecha: new Date(),
        generado: new Date(),
        hora: 1,
        id_mascota: 1,
        id_estilista1: 5,
        id_estilista2: 0,
        id_estilista3: 0,
      },
      {
        id: 2,
        fecha: new Date(),
        generado: new Date(),
        hora: 2,
        id_mascota: 2,
        id_estilista1: 2,
        id_estilista2: 4,
        id_estilista3: 0,
      },
      {
        id: 3,
        fecha: new Date(),
        generado: new Date(),
        hora: 3,
        id_mascota: 3,
        id_estilista1: 2,
        id_estilista2: 4,
        id_estilista3: 6,
      },
    ]
  }

  getCitasByDate(fecha: Date): Cita[] {
    console.table(this._DATA);
    return this._DATA
      .filter(cita => {
        return cita.fecha.getDate() == fecha.getDate() &&
        cita.fecha.getMonth() == fecha.getMonth() &&
        cita.fecha.getFullYear() == fecha.getFullYear()
      });
  }
}
