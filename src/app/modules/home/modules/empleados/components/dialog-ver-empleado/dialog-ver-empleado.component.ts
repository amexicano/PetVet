import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Empleado } from '../../../../../../interfaces/empleado.interface';
import { MatButtonModule } from '@angular/material/button';
import { Sexo } from '../../../../../../interfaces/sexo.interface';

@Component({
  selector: 'app-dialog-ver-empleado',
  standalone: true,
  templateUrl: './dialog-ver-empleado.component.html',
  styleUrls: ['./dialog-ver-empleado.component.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class DialogVerEmpleadoComponent {

  constructor(public dialogRef: MatDialogRef<DialogVerEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Empleado,) {
  }

  onNoClick = (): void => {
    this.dialogRef.close();
  }
  
}
