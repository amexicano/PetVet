import { Injectable } from '@angular/core';
import { Localidad } from '../interfaces/localidad.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {
  constructor(private httpClient: HttpClient) { }
  
  getLocalidadbyId(id: number) {
    return this.httpClient.get<Localidad>(`http://localhost:9090/localidades/${id}`)
  }

  getLocalidadesbyMunicipioId(municipio_id: number) {
    return this.httpClient.get<Localidad[]>(`http://localhost:9090/localidades/${municipio_id}/municipios`)
  }
}
