import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  _DATA: Cliente[];

  constructor(private httpClient: HttpClient) { 
    this._DATA = [
      {
        id: 1,
        nombre: 'Alejandro',
        primerApellido: 'Mexicano',
        segundoApellido: 'Ixtepan',
        telefono: '22419203',
        telefonoFijo: '37823508532',
        sexo: { id: 1, nombre: 'Masculino', activo: true },
        email: 'amexicano2412@gmail.com',
        curp: 'meia971204hvzxxl06',
        domicilio: {
          id: 1,
          calle: 'Circuito Turqueza',
          numeroExterior: '8D3',
          numeroInterior: '301',
          localidad: 8,
          codigoPostal: '56560'
        }
      }
    ]
  }

  getClientes(){
    return this.httpClient.get<Cliente[]>('http://localhost:9090/clientes')
  }

  getClienteById(id: number){
    return this.httpClient.get<Cliente>(`http://localhost:9090/clientes/${id}`)
  }

  getClienteByCURP(curp: string){
    return this.httpClient.get<Cliente>(`http://localhost:9090/clientes/curp/${curp}`)
  }

  eliminarCliente(id: number): void {
    this._DATA = this._DATA.filter((cliente) => cliente.id !== id);
  }

  addCliente(cliente: Cliente): void {
    cliente.id = this._DATA.length + 1
    this._DATA.push(cliente);
    console.table(this._DATA)
  }

  updateCliente(cliente: Cliente): void {
    this._DATA = this._DATA.map((e) => {
      if (e.id === cliente.id) {
        return cliente;
      }
      return e;
    });
  }

}
