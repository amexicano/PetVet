import { Injectable } from '@angular/core';
import { Estado } from '../interfaces/estado.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  _DATA!: Estado[]
  constructor() {
    this._DATA = [
      { id: 1, nombre: 'Acre', sigla: 'AC' },
      { id: 2, nombre: 'Alagoas', sigla: 'AL' },
    ]
  }
  getEstadobyId(id: number): Estado {
    return this._DATA
      .filter(estado => estado.id === id)[0]
  }

  getEstados(): Estado[] {
    return this._DATA
  }
}
