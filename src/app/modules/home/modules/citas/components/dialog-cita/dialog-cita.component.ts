import { Component, Inject } from '@angular/core';

import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HorariosService } from '../../../../../../services/horarios.service';
import { ClientesService } from '../../../../../../services/clientes.service';
import { Cliente } from '../../../../../../interfaces/cliente.interface';
import { MatSelectModule } from '@angular/material/select';
import { Mascota } from '../../../../../../interfaces/mascota.interface';
import { filter } from 'rxjs';
import { MascotaService } from '../../../../../../services/mascota.service';
import { CommonModule } from '@angular/common';
import { Horarios } from '../../../../../../interfaces/horarios.interface';
import { CitaService } from '../../../../../../services/cita.service';
import { Empleado } from '../../../../../../interfaces/empleado.interface';
import { EmpleadosService } from '../../../../../../services/empleados.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-dialog-cita',
  standalone: true,
  templateUrl: './dialog-cita.component.html',
  styleUrls: ['./dialog-cita.component.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})

export class DialogCitaComponent {
  newmascota: number = 0
  clienteControl!: FormControl<number | null>
  mascotaControl!: FormControl<number | null>
  mascotas: Mascota[] = []
  horarios: Horarios[] = []
  estilistas: Empleado[] = []
  citas: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogCitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public citasService: CitaService,
    public empleadosService: EmpleadosService,
    public horariosService: HorariosService,
    public mascotasService: MascotaService,
    public clienteService: ClientesService,    
    private fb: FormBuilder,) {

      this.clienteControl = new FormControl<number | null>(null, Validators.required)
      this.mascotaControl = new FormControl<number | null>(null, Validators.required)

      this.clienteControl.valueChanges.pipe(
          filter((value): value is number => value !== null),
        ).forEach(element => {
          this.mascotaControl.reset()
          this.mascotas = this.mascotasService.getMascotasbyIdCliente(element)
        })

      this.clienteControl.valueChanges.pipe(
          filter((value): value is number => value !== null),
        ).forEach(element => {
          this.newmascota = element
        })
      
      this.horarios = this.horariosService.getHorarios()
      this.estilistas = this.empleadosService.getEmpleados().filter((empleado) => empleado.rol === 3)
      this.citas = fb.group({});
  }

  onNoClick = (): void => {
    console.log('onNoClick');
    this.dialogRef.close();
  }

  guardarRespuesta = (): void => {
    console.log('guardarRespuesta');
    this.dialogRef.close();
  }

}
