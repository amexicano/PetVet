import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cita } from '../../../../../../interfaces/cita.interface';
import { MatCardModule } from '@angular/material/card';
import { EmpleadosService } from '../../../../../../services/empleados.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MascotaService } from '../../../../../../services/mascota.service';
import { Mascota } from '../../../../../../interfaces/mascota.interface';
import { Cliente } from '../../../../../../interfaces/cliente.interface';
import { ClientesService } from '../../../../../../services/clientes.service';
import { Empleado } from '../../../../../../interfaces/empleado.interface';
import { AccountService } from '../../../../../../services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCitaComponent } from '../dialog-cita/dialog-cita.component';

@Component({
  selector: 'app-mostrar-cita',
  standalone: true,
  templateUrl: './mostrar-cita.component.html',
  styleUrl: './mostrar-cita.component.css',
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class MostrarCitaComponent {
  @Input() cita!: Cita
  mascota!: Mascota
  cliente!: Cliente
  estilista1!: Empleado
  estilista2!: Empleado
  estilista3!: Empleado

  constructor(
    //private horarioService: HorarioService,
    private mascotaService: MascotaService,
    private clienteService: ClientesService,
    private empleadoService: EmpleadosService, 
    public accountService: AccountService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.mascota = this.mascotaService.getMascotasbyId(this.cita.id_mascota)
    this.cliente = this.clienteService.getClienteById(this.mascota.cliente)
    this.empleadoService.getEmpleadoById(this.cita.id_estilista1)
    .subscribe(empleado => {
      this.estilista1 = empleado
    })
    this.empleadoService.getEmpleadoById(this.cita.id_estilista2)
    .subscribe(empleado => {
      this.estilista2 = empleado
    })
    this.empleadoService.getEmpleadoById(this.cita.id_estilista3)
    .subscribe(empleado => {
      this.estilista3 = empleado
    })
  }

  agendar(cita: Cita): void {
    const dialogRef = this.dialog.open(DialogCitaComponent, {
      width: '85%',
      data: { action: 'Reagendar Cita', cita: cita }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    })

  }
}
