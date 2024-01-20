import { Injectable } from '@angular/core';
import { Estado } from '../interfaces/estado.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  _DATA!: Estado[]
  constructor(private httpClient: HttpClient) {
    this._DATA = [
      { id: 1, nombre: 'Acre', siglas: 'AC' },
      { id: 2, nombre: 'Alagoas', siglas: 'AL' },
    ]
  }
  getEstadobyId(id: number) {
    return this.httpClient.get<Estado>(`http://localhost:9090/estados/${id}`)
  }

  getEstados() {
    return this.httpClient.get<Estado[]>('http://localhost:9090/estados')
  }
}
