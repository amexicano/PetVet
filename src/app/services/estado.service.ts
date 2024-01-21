import { Injectable } from '@angular/core';
import { Estado } from '../interfaces/estado.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  constructor(private httpClient: HttpClient) { }

  getEstadobyId(id: number) {
    return this.httpClient.get<Estado>(`http://localhost:9090/estados/${id}`)
  }

  getEstados() {
    return this.httpClient.get<Estado[]>('http://localhost:9090/estados')
  }
}
