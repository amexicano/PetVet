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
import { MatNativeDateModule } from '@angular/material/core';
import { Cita } from '../../../../../../interfaces/cita.interface';

interface DialogData {
  action: string;
  cita: Cita | null;
}
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
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})

export class DialogCitaComponent {
  minDate = new Date();
  maxDate = new Date(this.minDate.getFullYear() + 1, this.minDate.getMonth(), this.minDate.getDate());
  newmascota: number = 0
  clienteControl!: FormControl<number | null>
  mascotaControl!: FormControl<number | null>

  // estilistaControl1!: FormControl<number | null>
  // estilistaControl2!: FormControl<number | null>
  // estilistaControl3!: FormControl<number | null>
  
  mascotas: Mascota[] = []
  horarios: Horarios[] = []
  estilistas: Empleado[] = []
  citas: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogCitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public citasService: CitaService,
    public empleadosService: EmpleadosService,
    public horariosService: HorariosService,
    public mascotasService: MascotaService,
    public clienteService: ClientesService,    
    private fb: FormBuilder,) {

      this.clienteControl = new FormControl<number | null>(null, Validators.required)
      this.mascotaControl = new FormControl<number | null>(null, Validators.required)
      // this.estilistaControl1 = new FormControl<number | null>(null, Validators.required)
      // this.estilistaControl2 = new FormControl<number | null>(null)
      // this.estilistaControl3 = new FormControl<number | null>(null)

      this.horarios = this.horariosService.getHorarios()
      this.estilistas = this.empleadosService.getEmpleados().filter((empleado) => empleado.rol === 3)
      this.citas = fb.group({
        cliente: this.clienteControl,
        mascota: this.mascotaControl,
        fecha: ['', Validators.required],
        horario: ['', Validators.required],
        estilista1: ['', Validators.required],
        estilista2: [''],
        estilista3: [''],
      });

    this.clienteControl.valueChanges.pipe(
      filter((value): value is number => value !== null),
    ).forEach(element => {
      this.mascotaControl.reset()
      this.mascotas = this.mascotasService.getMascotasbyIdCliente(element)
    })

    this.mascotaControl.valueChanges.pipe(
      filter((value): value is number => value !== null),
    ).forEach(element => {
      this.newmascota = element
    })

  }

  onNoClick = (): void => {
    this.dialogRef.close();
  }

  guardarRespuesta = (): void => {
    console.log('guardarRespuesta');
    this.dialogRef.close();
  }

}
