import { Injectable } from '@angular/core';
import { Municipio } from '../interfaces/municipio.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  constructor(private httpClient: HttpClient) { }

  getMunicipiobyId(id: number){
    return this.httpClient.get<Municipio>(`http://localhost:9090/municipios/${id}`)
  }

  getMunicipiosbyEstadoId(estado_id: number) {
    return this.httpClient.get<Municipio[]>(`http://localhost:9090/municipios/${estado_id}/estados`)
  }
}
