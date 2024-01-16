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
        colonia: 'Ayotla',
        municipio: 'Ixtapaluca',
        estado: 'Estado de Mexico',
        codigoPostal: '56560'
      },
    ]
  }

  getDomiciliobyId(id: number): Domicilio {
    return this._DATA.find(domicilio => domicilio.id == id) ??
    {
      id: 0,
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      colonia: '',
      municipio: '',
      estado: '',
      codigoPostal: ''
    }
  }
}
