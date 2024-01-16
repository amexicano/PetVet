import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RolService } from '../../../../services/rol.service';
import { Cliente } from '../../../../interfaces/cliente.interface';
import { ClientesService } from '../../../../services/clientes.service';
import { DialogClienteComponent } from '../dialog-cliente/dialog-cliente.component';
import { DialogVerClienteComponent } from '../dialog-ver-cliente/dialog-ver-cliente.component';

@Component({
  selector: 'app-table-clientes',
  standalone: true,
  templateUrl: './table-clientes.component.html',
  styleUrls: ['./table-clientes.component.css'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    DialogClienteComponent,
    DialogVerClienteComponent
  ],
})
export class TableClientesComponent {
  displayedColumns: string[] = ['id', 'nombre', 'primerApellido', 'segundoApellido', 'email', 'curp', 'acciones'];
  dataSource!: MatTableDataSource<Cliente>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private clienteService: ClientesService,
    public rolService: RolService,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Cliente>(this.clienteService.getClientes());
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  editarCliente(cliente: Cliente): void {
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: '95%',
      data: { action: 'Editar Cliente', cliente: cliente },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateTable();
    })
  }

  eliminarCliente(cliente: Cliente): void {
    this.clienteService.eliminarCliente(cliente.id);
    this.updateTable();
  }

  mostrarCliente(cliente: Cliente): void {
    const dialogRef = this.dialog.open(DialogVerClienteComponent, {
      width: '95%',
      data: cliente,
    });
  }

  updateTable(): void {
    this.dataSource = new MatTableDataSource<Cliente>(this.clienteService.getClientes());
    this.dataSource.paginator = this.paginator;
  }

  getRolbyId(id: number): string {
    return this.rolService.getRolbyId(id).nombre;
  }

}
