import { Injectable } from '@angular/core';
import { Mascota } from '../interfaces/mascota.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(private http: HttpClient) { }
  
  getMascotasbyIdCliente(id:number) {
    return this.http.get<Mascota[]>(`http://localhost:9090/mascotas/${id}/clientes`)
  }

  getAllMascotas() {
    return this.http.get<Mascota[]>('http://localhost:9090/mascotas')
  }

  getMascotabyId(id: number) {
    return this.http.get<Mascota>(`http://localhost:9090/mascotas/${id}`)
  }
}
