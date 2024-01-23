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
import { filter, switchMap } from 'rxjs';
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
  cita: Cita;
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
  newmascota: number = 0
  cita!: Cita | null
  clienteControl!: FormControl<number | null>
  mascotaControl!: FormControl<number | null>

  minDate: Date = new Date();
  maxDate: Date = new Date(this.minDate.getFullYear() + 1, this.minDate.getMonth(), this.minDate.getDate());

  clientes: Cliente[] = []
  mascotas: Mascota[] = []
  horarios: Horarios[] = []
  estilistas: Empleado[] = []
  citas!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogCitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public citasService: CitaService,
    public empleadosService: EmpleadosService,
    public horariosService: HorariosService,
    public mascotasService: MascotaService,
    public clienteService: ClientesService,    
    private fb: FormBuilder) {
      this.clienteService.getClientes()
      .subscribe((data: Cliente[]) => {
        this.clientes = data;
      })

      this.horariosService.getHorarios()
      .subscribe((data: Horarios[]) => {
        this.horarios = data;
      })

      this.empleadosService.getEmpleadosByRol(3).
      subscribe((data: Empleado[]) => {
        this.estilistas = data;
      })
      
      this.initFormFields(0, 0)
      if(data.cita.id != 0) {
        this.initFormFields(0, 0)

        this.mascotasService.getMascotabyId(this.data.cita.id_mascota)
        .pipe(
          switchMap((data: Mascota) => {
            this.initFormFields(data.id, data.cliente)
            this.citas = fb.group({
              id: this.data.cita.id,
              cliente: this.clienteControl,
              mascota: this.mascotaControl,
              fecha: [this.data.cita.fecha, Validators.required],
              horario: [this.data.cita.horario, Validators.required],
              estilista1: [this.data.cita.id_estilista1, Validators.required],
              estilista2: [this.data.cita.id_estilista2],
              estilista3: [this.data.cita.id_estilista3],
            })

            return this.mascotasService.getMascotasbyIdCliente(data.cliente)
          })
        )
        .subscribe({
          next: (data: Mascota[]) => {
            this.mascotas = data;
          },
          error: error => {
            this.mascotas = []
          }
        })        
      } else {
        if(data.cita.fecha == null) {
          this.citas = fb.group({
            id: 0,        
            cliente: this.clienteControl,
            mascota: this.mascotaControl,
            fecha: ['', Validators.required],
            horario: ['', Validators.required],
            estilista1: ['', Validators.required],
            estilista2: [''],
            estilista3: [''],
          });
          return;      
        } else{
            this.citas = fb.group({
              id: 0,
              cliente: this.clienteControl,
              mascota: this.mascotaControl,
              fecha: [data.cita.fecha, Validators.required],
              horario: ['', Validators.required],
              estilista1: ['', Validators.required],
              estilista2: [''],
              estilista3: [''],
            });
            return;
        }
      }
    }

  initFormFields = (mascota_id: number, cliente_id: number) => {
    this.clienteControl = new FormControl<number | null>(cliente_id, Validators.required)
    this.mascotaControl = new FormControl<number | null>(mascota_id, Validators.required)

    this.clienteControl.valueChanges
      .pipe(
        filter((value): value is number => value !== null),
        switchMap((value: number) => {
          this.mascotaControl.reset()
          return this.mascotasService.getMascotasbyIdCliente(value)
        })
      ).subscribe((data: Mascota[]) => {
        this.mascotas = data;
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
    console.table(this.citas.value)
    let cita = this.citas.value
    let newCita: Cita = {
      id: cita.id,
      fecha: cita.fecha,
      generado: new Date(),
      horario: cita.horario,
      id_mascota: cita.mascota,
      id_estilista1: cita.estilista1,
      id_estilista2: cita.estilista2 == '' ? 0 : cita.estilista2,
      id_estilista3: cita.estilista3 == '' ? 0 : cita.estilista3,
    } 

    if(cita.id == 0) {
      console.log('guardarRespuesta');
      this.citasService.addCita(newCita).subscribe({
        next: (data: Cita) => {
          console.log(data)
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    } else {
      this.citasService.updateCita(newCita)
      .subscribe({
        next: (data: Cita) => {
          console.log(data)
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    }
    this.dialogRef.close();
  }

  onlyWeekdays = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

}

