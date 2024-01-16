import { Injectable } from '@angular/core';
import { Municipio } from '../interfaces/municipio.interface';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  _DATA!: Municipio[]
  constructor() { 
    this._DATA = [
      { id: 1, nombre: 'Acrelândia', estado_id: 1 },
      { id: 2, nombre: 'Assis Brasil', estado_id: 1 },
      { id: 3, nombre: 'Água Branca', estado_id: 2 },
      { id: 4, nombre: 'Anadia', estado_id: 2 },
    ]
  }

  getMunicipiobyId(id: number): Municipio {
    return this._DATA
      .filter(municipio => municipio.id === id)[0]
  }

  getMunicipiosbyEstadoId(estado_id: number): Municipio[] {
    return this._DATA
      .filter(municipio => municipio.estado_id === estado_id)
  }
}
