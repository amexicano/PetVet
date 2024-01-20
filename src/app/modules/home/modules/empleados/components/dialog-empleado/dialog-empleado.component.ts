import { Component, Inject } from '@angular/core';
// Importing the Angular Material Components
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
// Interface Empleado
import { Empleado } from '../../../../../../interfaces/empleado.interface';
//Services
import { EmpleadosService } from '../../../../../../services/empleados.service';
import { RolService } from '../../../../../../services/rol.service';
import { SexoService } from '../../../../../../services/sexo.service';
import { Sexo } from '../../../../../../interfaces/sexo.interface';
import { Rol } from '../../../../../../interfaces/rol.interface';

interface ActionEmpleado {
  empleado: Empleado,
  action: string
}

@Component({
  selector: 'app-dialog-empleado',
  standalone: true,
  templateUrl: './dialog-empleado.component.html',
  styleUrls: ['./dialog-empleado.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DialogEmpleadoComponent {
  sexos: Sexo[] = []
  roles: Rol[] = []
  maxDate!: Date;
  form_empleado: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActionEmpleado,
      private empleadoService: EmpleadosService,
      private sexoService: SexoService,
      private rolService: RolService,
      private fb: FormBuilder,) {
      
      this.sexoService.getSexos()
      .subscribe((data: Sexo[]) => {
        this.sexos = data;
      });
      this.rolService.getRoles()
      .subscribe((data: Sexo[]) => {
        this.roles = data;
      });

      if (data.empleado){
        this.form_empleado = fb.group({
          id: [data.empleado?.id, []],
          nombre: [data.empleado?.nombre, [Validators.required]],
          primerap: [data.empleado?.primerApellido, [Validators.required]],
          segundoap: [data.empleado?.segundoApellido, [Validators.required]],
          correo: [data.empleado?.email, [Validators.required, Validators.email]],
          telefono: [data.empleado?.telefono, [Validators.required]],
          fechaNacimiento: [data.empleado?.fechaNacimiento, [Validators.required]],
          fechaIngreso: [data.empleado?.fechaIngreso, [Validators.required]],
          rol: [data.empleado?.rol.id, [Validators.required]],
          sexo: [data.empleado?.sexo.id, [Validators.required]],
          activo: [data.empleado?.activo, []],
        });
      } else {
        this.form_empleado = fb.group({
          id: [0, []],
          nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z\u00f1\u00d1 ]*')]],
          primerap: ['', [Validators.required, Validators.pattern('[a-zA-Z\u00f1\u00d1 ]*')]],
          segundoap: ['', [Validators.required, Validators.pattern('[a-zA-Z\u00f1\u00d1 ]*')]],
          correo: ['', [Validators.required, Validators.email]],
          telefono: ['', [Validators.required]],
          fechaNacimiento: ['', [Validators.required]],
          fechaIngreso: [new Date(), [Validators.required]],
          rol: [0, [Validators.required]],
          sexo: [0, [Validators.required]],
          activo: [false, []],
        });
      }
  }
  
  saveEmpleado = (): void => {
    const newEmpleado = this.getEmpleadoValues()

    if(newEmpleado.id == 0){
      this.empleadoService.addEmpleado(newEmpleado)
        .subscribe(response => {
          //do something with response
        }, err => {
          console.log(err.message);
        })
    } else{
      this.empleadoService.updateEmpleado(newEmpleado).subscribe();
    }

    this.dialogRef.close();
  }

  private getEmpleadoValues(): Empleado {
    const cita = this.form_empleado.value
    let selectedSexo: Sexo = {
      id: 0,
      nombre: '',
      activo: false
    }
    let selectedRol: Rol = {
      id: 0,
      nombre: '',
      activo: false
    }

    this.sexos.forEach(element => {
      if(element.id == cita.sexo){
        selectedSexo = element
      }
    });

    this.roles.forEach(element => {
      if(element.id == cita.rol){
        selectedRol = element
      }
    });

    return {
      id: cita.id,
      nombre: cita.nombre,
      primerApellido: cita.primerap,
      segundoApellido: cita.segundoap,
      email: cita.correo,
      telefono: cita.telefono,
      fechaNacimiento: cita.fechaNacimiento,
      fechaIngreso: cita.fechaIngreso,
      rol: selectedRol,
      sexo: selectedSexo,
      activo: cita.activo
    }
  }
}
