import { Component, ViewChild } from '@angular/core';
import { ContentCardComponent } from '../../../../components/content-card/content-card.component';
import { SearchingBoxComponent } from '../../components/searching-box/searching-box.component';
import { TableClientesComponent } from './components/table-clientes/table-clientes.component';
import { ClientesService } from '../../services/clientes.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogVerClienteComponent } from './components/dialog-ver-cliente/dialog-ver-cliente.component';
import { DialogClienteComponent } from './components/dialog-cliente/dialog-cliente.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  imports: [
    MatDialogModule,
    ContentCardComponent,
    SearchingBoxComponent,
    TableClientesComponent,
  ],
})
export class ClientesComponent {
  @ViewChild(TableClientesComponent) tableEmpleados!: TableClientesComponent;

  constructor(private clientesService: ClientesService,
    public dialog: MatDialog) { }


  findCliente = (event: string): void => {
    const cliente = this.clientesService.getClienteByCURP(event.toLowerCase());
    const dialogRef = this.dialog.open(DialogVerClienteComponent, {
      width: '95%',
      data: cliente,
    });
  }

  nuevoCliente = (): void => {
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: '95%',
      data: { action: 'Crear Empleado', cliente: null },
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.tableEmpleados.updateTable();
    });  }
}
