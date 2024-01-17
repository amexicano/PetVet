import { Injectable } from '@angular/core';
import { Mascota } from '../interfaces/mascota.interface';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  _DATA: Mascota[]

  constructor() {
    this._DATA = [
      {
        id: 1,
        nombre: 'Firulais',
        raza: 1,
        // sexo: 1,
        descripcion: 'Blanco con manchas negras',
        // esterilizado: true,
        // microchip: true,
        cliente: 1,
        activo: true
      },
      {
        id: 2,
        nombre: 'Binki',
        raza: 1,
        // sexo: 1,
        descripcion: 'Negro',
        // esterilizado: true,
        // microchip: true,
        cliente: 1,
        activo: true
      },
      {
        id: 3,
        nombre: 'Scooby',
        raza: 1,
        // sexo: 1,
        descripcion: 'Cafe con manchas negras',
        // esterilizado: true,
        // microchip: true,
        cliente: 1,
        activo: true
      },
    ]
  }
  
  getMascotasbyIdCliente(id:number): Mascota[] {
    return this._DATA.filter(mascota => mascota.cliente == id)
  }

  getMascotasbyId(id: number): Mascota {
    return this._DATA.filter(mascota => mascota.id == id)[0]
  }
}
