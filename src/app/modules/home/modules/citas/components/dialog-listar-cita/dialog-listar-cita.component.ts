import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-listar-cita',
  standalone: true,
  templateUrl: './dialog-listar-cita.component.html',
  styleUrls: ['./dialog-listar-cita.component.css'],
  imports: [
    MatDialogModule,
    CommonModule,
    MatButtonModule,
  ],
})
export class DialogListarCitaComponent {
  
  constructor(public dialogRef: MatDialogRef<DialogListarCitaComponent>,
    @Inject(MAT_DIALOG_DATA) public fecha: Date) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
