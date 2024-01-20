import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Raza } from '../interfaces/raza.interface';

@Injectable({
  providedIn: 'root'
})
export class RazaService {

  constructor(private htttpClient: HttpClient) { }

  getRazas() {
    return this.htttpClient.get<Raza[]>('http://localhost:9090/razas');
  }

  getRazaById(id: string) {
    return this.htttpClient.get<Raza>('http://localhost:9090/razas/' + id);
  }
}
