import { Injectable } from '@angular/core';
import { Horarios } from '../interfaces/horarios.interface';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  _DATA !: Horarios[];
  constructor() { 
    this._DATA = [
      {
        id: 1,
        horario: '09:00 a.m. - 11:00 a.m.',
        activo: true,
      },
      {
        id: 2,
        horario: '11:00 a.m. - 1:00 p.m.',
        activo: true,
      },
      {
        id: 3,
        horario: '1:00 p.m. - 3:00 p.m.',
        activo: false,
      },
      {
        id: 4,
        horario: '4:00 p.m. - 6:00 p.m.',
        activo: true,
      },
      {
        id: 5,
        horario: '6:00 p.m. - 8:00 p.m.',
        activo: true,
      },
    ];
  }

  getHorarios = (): Horarios[] => {
    return this._DATA;
  }

  getHorario = (id: number): Horarios => {
    return this._DATA.find((horario) => horario.id === id)!;
  }
}
