import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Cita } from '../../../../../../interfaces/cita.interface';
import { MostrarCitaComponent } from '../mostrar-cita/mostrar-cita.component';
import { CitaService } from '../../../../../../services/cita.service';
import { AccountService } from '../../../../../../services/account.service';
import { DialogCitaComponent } from '../dialog-cita/dialog-cita.component';

@Component({
  selector: 'app-dialog-listar-cita',
  standalone: true,
  templateUrl: './dialog-listar-cita.component.html',
  styleUrls: ['./dialog-listar-cita.component.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MostrarCitaComponent
  ],
})
export class DialogListarCitaComponent {
  citas!: Cita[]

  constructor(public dialogRef: MatDialogRef<DialogListarCitaComponent>,
    public citaService: CitaService,
    public accountService: AccountService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public fecha: Date) { 
      this.citaService.getCitasByDate(fecha)
      .subscribe({
        next: citas => {
          this.citas = citas
        },
        error: err => {
          this.citas = []
        }
      })
  }

  crearCita = (): void => {
    const dialogRef = this.dialog.open(DialogCitaComponent, {
      width: '85%',
      data: { action: 'Crear Cita', cita: {
        id: 0,
        fecha: this.fecha,
        generado: null,
        hora: 0,
        id_mascota: 0,
        id_estilista1: 0,
        id_estilista2: 0,
        id_estilista3: 0,
      } }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.citaService.getCitasByDate(this.fecha)
        .subscribe({
          next: citas => {
            this.citas = citas
          },
          error: err => {
            this.citas = []
          }
        })
    })
  }

  update() {
    this.citaService.getCitasByDate(this.fecha)
      .subscribe({
        next: citas => {
          this.citas = citas
        },
        error: err => {
          this.citas = []
        }
      })

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
