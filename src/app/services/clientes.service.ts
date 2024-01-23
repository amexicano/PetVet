import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private httpClient: HttpClient) { }

  getClientes(){
    return this.httpClient.get<Cliente[]>('http://localhost:9090/clientes')
  }

  getClienteById(id: number){
    return this.httpClient.get<Cliente>(`http://localhost:9090/clientes/${id}`)
  }

  getClienteByCURP(curp: string){
    return this.httpClient.get<Cliente>(`http://localhost:9090/clientes/curp/${curp}`)
  }

  eliminarCliente(id: number) {
    return this.httpClient.delete<Cliente>(`http://localhost:9090/clientes/${id}`)
  }

  addCliente(cliente: Cliente) {
    return this.httpClient.post<Cliente>('http://localhost:9090/clientes', cliente)
  }

  updateCliente(cliente: Cliente) {
    return this.httpClient.put<Cliente>(`http://localhost:9090/clientes/${cliente.id}`, cliente)
  }

}
