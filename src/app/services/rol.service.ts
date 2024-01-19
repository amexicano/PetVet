import { Injectable } from '@angular/core';
import { Rol } from '../interfaces/rol.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private httpClient: HttpClient) { }

  getRolbyId(id: number){
    return this.httpClient.get<Rol>(`http://localhost:9090/roles/${id}`);
  }

  getRoles() {
    return this.httpClient.get<Rol[]>('http://localhost:9090/roles');
  }
}
