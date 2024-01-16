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
import { Empleado } from '../../../../interfaces/empleado.interface';
//Services
import { EmpleadosService } from '../../../../services/empleados.service';
import { RolService } from '../../../../services/rol.service';
import { SexoService } from '../../../../services/sexo.service';

interface ActionEmpleado{
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
  ]
})
export class DialogEmpleadoComponent {
  form_empleado: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActionEmpleado,
     private empleadoService: EmpleadosService,
     public rolService: RolService,
     public sexoService: SexoService,
     private fb: FormBuilder,) {

      this.form_empleado = fb.group({
        id: [data.empleado?.id, []],
        nombre: [data.empleado?.nombre, [Validators.required, Validators.pattern('[a-zA-Z\u00f1\u00d1 ]*')]],
        primerap: [data.empleado?.primerApellido, [Validators.required, Validators.pattern('[a-zA-Z\u00f1\u00d1 ]*')]],
        segundoap: [data.empleado?.segundoApellido, [Validators.required, Validators.pattern('[a-zA-Z\u00f1\u00d1 ]*')]],
        correo: [data.empleado?.email, [Validators.required, Validators.email]],
        telefono: [data.empleado?.telefono, [Validators.required]],
        fechaNacimiento: [data.empleado?.fechaNacimiento, [Validators.required]],
        fechaIngreso: [data.empleado?.fechaIngreso ?? new Date(), [Validators.required]],
        rol: [data.empleado?.rol, [Validators.required]],
        sexo: [data.empleado?.sexo, [Validators.required]],
        activo: [data.empleado?.activo, []],
      });
  }
  
  saveEmpleado = (): void => {
    const newEmpleado = this.getEmpleadoValues()
    
    if(newEmpleado.id == 0){
      this.empleadoService.addEmpleado(newEmpleado)
    } else{
      this.empleadoService.updateEmpleado(newEmpleado)
    }

    this.dialogRef.close();
  }

  private getEmpleadoValues(): Empleado {
    const cita = this.form_empleado.value
    return {
      id: cita.id,
      nombre: cita.nombre,
      primerApellido: cita.primerap,
      segundoApellido: cita.segundoap,
      email: cita.correo,
      telefono: cita.telefono,
      sexo: cita.sexo,
      fechaNacimiento: cita.fechaNacimiento,
      fechaIngreso: cita.fechaIngreso,
      rol: cita.rol,
      activo: cita.activo
    }

  }
}
