import { Injectable } from '@angular/core';
import { Rol } from '../interfaces/rol.interface';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  _DATA: Rol[];

  constructor() { 
    this._DATA = [
      {
        id: 1,
        nombre: 'Administrador',
        activo: true
      },
      {
        id: 2,
        nombre: 'Recepcionista',
        activo: true
      },
      {
        id: 3,
        nombre: 'Estilista',
        activo: true
      },
    ]
  }

  getRolbyId(id: number): Rol {
    return this._DATA.find(rol => rol.id === id) 
      ?? {id:0, nombre: '', activo: false};
  }

  getRoles(): Rol[] {
    return this._DATA;
  }
}
