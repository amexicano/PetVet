import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CalendarComponent } from '../../../../modules/home/modules/citas/components/calendar/calendar.component';
import { ContentCardComponent } from '../../../../components/content-card/content-card.component';
import { DialogCitaComponent } from './components/dialog-cita/dialog-cita.component';
import { DialogListarCitaComponent } from './components/dialog-listar-cita/dialog-listar-cita.component';
import { AccountService } from '../../../../services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-citas',
  standalone: true,
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    CalendarComponent,
    ContentCardComponent,
  ],
})

export class CitasComponent {
  title = 'Citas';
  visualizar;
  @ViewChild(CalendarComponent) calendar!: CalendarComponent;
  
  constructor(private accountService: AccountService, 
    public dialog: MatDialog) { 
      this.visualizar = 
      this.accountService.userValue?.tipo == 0 || this.accountService.userValue?.tipo == 1 || this.accountService.userValue?.tipo == 2;
    }

  nuevaCita = (): void => {
    const dialogRef = this.dialog.open(DialogCitaComponent, {
      width: '85%',
      data: { action: 'Crear Cita', date: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    })
  }

  listarCitasDelDia = (todayDate: Date): void => {
    const dialogRef = this.dialog.open(DialogListarCitaComponent, {
      width: '85%',
      data: todayDate
    });

    dialogRef.afterClosed().subscribe(result => {
      this.calendar.selectedDate = null;
      console.log('The dialog was closed');
    })
  }

}
