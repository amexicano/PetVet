import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  _DATA: Cliente[];

  constructor() { 
    this._DATA = [
      {
        id: 1,
        nombre: 'Alejandro',
        primerApellido: 'Mexicano',
        segundoApellido: 'Ixtepan',
        telefono: '22419203',
        telefonoFijo: '37823508532',
        sexo: 1,
        email: 'amexicano2412@gmail.com',
        curp: 'meia971204hvzxxl06',
        domicilio: 1
      }
    ]
  }

  getClientes(): Cliente[]{
    return this._DATA
  }

  getClienteById(id: number): Cliente {
    return this._DATA.filter(cliente => cliente.id == id)[0]
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

  getClienteByCURP(curp: string): Cliente {
    curp = curp.toLowerCase();
    return this._DATA.find((cliente) => cliente.curp.toLowerCase() === curp)!;
  }

}
