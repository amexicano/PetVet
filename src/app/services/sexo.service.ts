import { Injectable } from '@angular/core';
import { Sexo } from '../interfaces/sexo.interface'
@Injectable({
  providedIn: 'root'
})
export class SexoService {
  _DATA!: Sexo[];

  constructor() {
    this._DATA  = [
      {
        id: 1,
        nombre: 'Masculino',
        activo: true
      },
      {
        id: 2,
        nombre: 'Femenino',
        activo: true
      }
    ]
  }

  getSexos(){
    return this._DATA
  }

  getSexobyId(id: number): Sexo{
    return this._DATA.find(rol => rol.id === id)
      ?? { id: 0, nombre: '', activo: false };

  }
}
