import { Component, EventEmitter, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { CitaService } from '../../../../../../services/cita.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  imports: [
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})

export class CalendarComponent {
  @Output() selectedValue;
  selectedDate: Date | null;
  minDate: Date;
  maxDate: Date;

  constructor(public dialog: MatDialog,
    private citaService: CitaService,) {
    this.selectedDate = null;
    this.minDate = new Date();
    this.maxDate = new Date(this.minDate.getFullYear() + 1, this.minDate.getMonth(), this.minDate.getDate());
    this.selectedValue = new EventEmitter<Date>();
   }

  getDatey = () => {
    setTimeout(() => { this.selectedValue.emit(this.selectedDate!) }, 50);
  }
  
  disabledDays = (date: Date) => {
    if (date.getDay() != 0 && date.getDay() != 6) return true;
    return false;
  };

  mapaCalor() {
    
    return (cellDate: Date, view: any) => {
      const nowDate = new Date();
      if (view === 'month') {
        // Mes y Año actuales
        if (cellDate.getMonth() === nowDate.getMonth()
          && cellDate.getFullYear() == nowDate.getFullYear()) {
          // Días pasados la fecha actual
          return (new Date().getDate() > cellDate.getDate()) ? '' : this._filtroDias(cellDate);
        }
        return this._filtroDias(cellDate);
      }
      return '';
    }
  }

  _filtroDias(date: Date): string {
    let estado: string = '';
    this.citaService.getCitasByDate(date)
    .subscribe(citas => {
      if (citas.length == 0) estado = '';
      if (citas.length == 1 || citas.length == 2) estado = 'indicador-verde';
      if (citas.length == 3 || citas.length == 4) estado = 'indicador-amarillo';
    })
    return estado
  }
}
