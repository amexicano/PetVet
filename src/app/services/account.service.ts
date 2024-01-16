import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { EmpleadosService } from '../modules/home/services/empleados.service';
import { Empleado } from '../modules/home/interfaces/empleado.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private empleadoService: EmpleadosService
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }
  
  get userValue(): User | null {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    let user = { token: 'fake-token', tipo: -1}
    
    if (username === 'admin') {
      if (password === 'admin') {
          user.tipo = 0;
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return this.user;
      } 
    } 
    if(password == 'PetVet@User') {
      // Buscar en empleados
      let resultado: Empleado | undefined = this.empleadoService.getEmpleados()
      .find(empleado => empleado.email == username);

      if(resultado){
        user.tipo = resultado.rol;
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return this.user;
      }

    }

    this.userSubject.error('Usuario o contraseña incorrectos');
    return this.user;
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['']);
  }
}
