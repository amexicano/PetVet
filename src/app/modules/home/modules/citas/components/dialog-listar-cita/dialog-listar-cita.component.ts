import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Cita } from '../../../../../../interfaces/cita.interface';
import { MostrarCitaComponent } from '../mostrar-cita/mostrar-cita.component';
import { CitaService } from '../../../../../../services/cita.service';
import { AccountService } from '../../../../../../services/account.service';

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
    @Inject(MAT_DIALOG_DATA) public fecha: Date) { 
      this.citas = this.citaService.getCitasByDate(fecha);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
