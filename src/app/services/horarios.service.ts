import { Injectable } from '@angular/core';
import { Horarios } from '../interfaces/horarios.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  constructor(private httpClient: HttpClient) { 
  }

  getHorarios = () => {
    return this.httpClient.get<Horarios[]>('http://localhost:9090/horarios');
  }

  getHorario = (id: number) => {
    return this.httpClient.get<Horarios>(`http://localhost:9090/horarios/${id}`);
  }
}
