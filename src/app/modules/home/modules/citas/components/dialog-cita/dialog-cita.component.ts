import { Component, Inject } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Citas } from '../../interfaces/citas.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-cita',
  standalone: true,
  templateUrl: './dialog-cita.component.html',
  styleUrls: ['./dialog-cita.component.css'],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})

export class DialogCitaComponent {
  action!: string;
  citas: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogCitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Citas,
    private fb: FormBuilder,) {
      this.action = data.action;
      this.citas = fb.group({
        correo: [''],
      });
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
