import { Injectable } from '@angular/core';
import { Localidad } from '../interfaces/localidad.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {
  _DATA!: Localidad[];
  constructor() { 
    this._DATA = [
      { id: 1, nombre: 'Acrelândia', municipio_id: 1 },
      { id: 2, nombre: 'Assis Brasil', municipio_id: 1 },
      { id: 3, nombre: 'Água Branca', municipio_id: 2 },
      { id: 4, nombre: 'Anadia', municipio_id: 2 },
      { id: 5, nombre: 'Arapiraca', municipio_id: 3 },
      { id: 6, nombre: 'Atalaia', municipio_id: 3 },
      { id: 7, nombre: 'Barra de Santo Antônio', municipio_id: 4 },
      { id: 8, nombre: 'Barra de São Miguel', municipio_id: 4 },
    ]
  }
  
  getLocalidadbyId(id: number): Localidad {
    return this._DATA
      .filter(localidad => localidad.id === id)[0]
  }

  getLocalidadesbyMunicipioId(municipio_id: number): Localidad[] {
    return this._DATA
      .filter(localidad => localidad.municipio_id === municipio_id)
  }
}
