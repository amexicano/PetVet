import { Injectable } from '@angular/core';
import { Domicilio } from '../interfaces/domicilio.interface';

@Injectable({
  providedIn: 'root'
})
export class DomicilioService {
  _DATA: Domicilio[];
  constructor() { 
    this._DATA = [
      {
        id:1,
        calle: 'Circuito Turqueza',
        numeroExterior: '8D3',
        numeroInterior: '301',
        localidad: 8,
        codigoPostal: '56560'
      },
    ]
  }
  updateDomicilio(domicilio: Domicilio): Domicilio {
    const index = this._DATA.findIndex(d => d.id === domicilio.id)
    this._DATA[index] = domicilio
    return domicilio
  }

  addDomicilio(domicilio: Domicilio): Domicilio {
    domicilio.id = this._DATA.length + 1
    this._DATA.push(domicilio)
    return domicilio
  }

  getDomiciliobyId(id: number): Domicilio {
    return this._DATA.find(domicilio => domicilio.id == id) ??
    {
      id: 0,
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      localidad: 0,
      codigoPostal: ''
    }
  }
}
