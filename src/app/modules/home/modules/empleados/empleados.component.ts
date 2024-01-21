import { Component, Injector, ViewChild } from '@angular/core';
import { ContentCardComponent } from '../../../../components/content-card/content-card.component';
import { SearchingBoxComponent } from '../../components/searching-box/searching-box.component';
import { TableEmpleadosComponent } from './components/table-empleados/table-empleados.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { EmpleadosService } from '../../../../services/empleados.service';
import { DialogEmpleadoComponent } from './components/dialog-empleado/dialog-empleado.component';
import { DialogVerEmpleadoComponent } from './components/dialog-ver-empleado/dialog-ver-empleado.component';

@Component({
  selector: 'app-empleados',
  standalone: true,
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  imports: [
    MatDialogModule,
    TableEmpleadosComponent,
    SearchingBoxComponent,
    ContentCardComponent
  ],
})

export class EmpleadosComponent {
  @ViewChild(TableEmpleadosComponent) tableEmpleados!: TableEmpleadosComponent;

  constructor(private empleadoService: EmpleadosService,
    public dialog: MatDialog,
    private injector: Injector) { }

  findEmpleado = (event: any): void =>  {
    this.empleadoService.getEmpleadoById(parseInt(event))
    .subscribe({
      next: empleado => {
        const dialogRef = this.dialog.open(DialogVerEmpleadoComponent, {
          width: '95%',
          data: empleado,
        });
      },
      error: err => {
        const dialogRef = this.dialog.open(DialogVerEmpleadoComponent, {
          width: '95%',
          data: null,
        });
      }
    });
  }

  newEmpleado = (): void => {
    const dialogRef = this.dialog.open(DialogEmpleadoComponent, {
      width: '95%',
      data: { action: 'Crear Empleado', empleado: null },
      injector: this.injector,
    });

    this.dialog.afterAllClosed.subscribe(() => {
      setTimeout(() => {
        this.tableEmpleados.updateTable();
      }, 500);
    });
  }
}
