import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../../../../../interfaces/cliente.interface';
import { SexoService } from '../../../../../../services/sexo.service';
import { Sexo } from '../../../../../../interfaces/sexo.interface';

interface ActionCliente{
  cliente: Cliente,
  action: string
}

@Component({
  selector: 'app-dialog-cliente',
  standalone: true,
  templateUrl: './dialog-cliente.component.html',
  styleUrls: ['./dialog-cliente.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DialogClienteComponent {
  sexos: Sexo[]
  action: string
  form_cliente: FormGroup
  cliente: Cliente

  constructor(public dialogRef: MatDialogRef<DialogClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActionCliente, 
    public sexoService: SexoService,
    public fb: FormBuilder) {
      this.action = data.action
      this.cliente = data.cliente ?? {
        id: 0,
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        telefonoFijo: '',
        telefono: '',
        sexo: 0,
        email: '',
        curp: '',
        domicilio: 0,
      }

      this.sexos = sexoService.getSexos()

      this.form_cliente = fb.group({
        id: [this.cliente.id],
        nombre: [this.cliente.nombre, [Validators.required]],
        primerap: [this.cliente.primerApellido, [Validators.required]],
        segundoap: [this.cliente.segundoApellido, [Validators.required]],
        correo: [this.cliente.email, [Validators.required, Validators.email]],
        sexo: [this.cliente.sexo, [Validators.required]],
        telefono: [this.cliente.telefono, [Validators.required]],
        telefonoFijo: [this.cliente.telefonoFijo, [Validators.required]],
        curp: [this.cliente.curp.toUpperCase(), [Validators.required]],
        //Domicilio
      })
  }

  saveCliente(): void{

    this.dialogRef.close()
  }
  
}
