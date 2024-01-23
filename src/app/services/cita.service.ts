import { Injectable } from '@angular/core';
import { Cita } from '../interfaces/cita.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  constructor(private httpClient: HttpClient) { }

  addCita(cita: Cita) {
    return this.httpClient.post<Cita>('http://localhost:9090/citas', cita)
  }

  updateCita(cita: Cita) {
    return this.httpClient.put<Cita>(`http://localhost:9090/citas/${cita.id}`, cita)
  }

  getCitasByDate(fecha: Date) {
    return this.httpClient.get<Cita[]>(`http://localhost:9090/citas/${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getFullYear()}/fecha`)
  }
}
