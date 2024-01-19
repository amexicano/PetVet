import { Injectable } from '@angular/core';
import { Sexo } from '../interfaces/sexo.interface'
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SexoService {

  constructor(private httpClient: HttpClient) {}

  getSexos(){
    return this.httpClient.get<Sexo[]>('http://localhost:9090/sexos');
  }

  getSexobyId(id: number){
    return this.httpClient.get<Sexo>(`http://localhost:9090/sexos/${id}`);
  }
}
