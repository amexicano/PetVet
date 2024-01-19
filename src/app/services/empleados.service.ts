import { Injectable } from '@angular/core';
import { Empleado } from '../interfaces/empleado.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private httpClient: HttpClient) { }

  getEmpleados(){
    return this.httpClient.get<Empleado[]>('http://localhost:9090/empleados')
  }

  eliminarEmpleado(id: number) {
    return this.httpClient.delete(`http://localhost:9090/empleados/${id}`)
  }

  addEmpleado(empleado: Empleado) {
    return this.httpClient.post<Empleado>('http://localhost:9090/empleados', empleado)
  }

  updateEmpleado(empleado: Empleado) {
    return this.httpClient.put<Empleado>(`http://localhost:9090/empleados/${empleado.id}`, empleado)
  }

  getEmpleadoById(id: number){
    return this.httpClient.get<Empleado>(`http://localhost:9090/empleados/${id}`)
  }

  getEmpleadosByRol(id: number) {
    return this.httpClient.get<Empleado[]>(`http://localhost:9090/empleados/${id}/rol`)

  }

}
