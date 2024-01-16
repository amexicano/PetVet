import { Component, Injector, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
//Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
// Angular Material
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
//Components
import { DialogEmpleadoComponent } from '../dialog-empleado/dialog-empleado.component';
// Interfaces & Services
import { Empleado } from '../../../../../../interfaces/empleado.interface';
import { EmpleadosService } from '../../../../../../services/empleados.service';
import { RolService } from '../../../../../../services/rol.service';
import { DialogVerEmpleadoComponent } from '../dialog-ver-empleado/dialog-ver-empleado.component';

@Component({
  selector: 'app-table-empleados',
  standalone: true,
  templateUrl: './table-empleados.component.html',
  styleUrls: ['./table-empleados.component.css'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
})

export class TableEmpleadosComponent {
  displayedColumns: string[] = ['id','nombre', 'primerApellido', 'segundoApellido', 'email', 'rol','acciones'];
  dataSource!: MatTableDataSource<Empleado>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private empleadosService: EmpleadosService,
    public rolService: RolService,
    public dialog: MatDialog,
    private injector: Injector) {
    this.dataSource = new MatTableDataSource<Empleado>(this.empleadosService.getEmpleados());
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  editarEmpleado(empleado: Empleado): void {
    const dialogRef = this.dialog.open(DialogEmpleadoComponent, {
      width: '95%',
      data: {action: 'Editar Empleado', empleado: empleado},
      injector: this.injector,
    }, );

    dialogRef.afterClosed().subscribe(result => {
      this.updateTable();
    })
  }

  eliminarEmpleado(empleado: Empleado): void {
    this.empleadosService.eliminarEmpleado(empleado.id);
    this.updateTable();
  }

  mostrarEmpleado(empleado: Empleado): void {
    const dialogRef = this.dialog.open(DialogVerEmpleadoComponent, {
      width: '95%',
      data: empleado,
    });
  }

  updateTable(): void {
    this.dataSource = new MatTableDataSource<Empleado>(this.empleadosService.getEmpleados());
    this.dataSource.paginator = this.paginator;
  }

  getRolbyId(id: number): string {
    return this.rolService.getRolbyId(id).nombre;
  }
}
