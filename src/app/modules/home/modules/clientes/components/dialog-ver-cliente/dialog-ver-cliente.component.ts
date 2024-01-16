import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from '../../../../../../interfaces/cliente.interface';
import { SexoService } from '../../../../../../services/sexo.service';
import { Domicilio } from '../../../../../../interfaces/domicilio.interface';
import { DomicilioService } from '../../../../../../services/domicilio.service';
import { Mascota } from '../../../../../../interfaces/mascota.interface';
import { MostrarMascotaComponent } from '../../../../components/mostrar-mascota/mostrar-mascota.component';
import { MascotaService } from '../../../../../../services/mascota.service';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'app-dialog-ver-cliente',
  standalone: true,
  templateUrl: './dialog-ver-cliente.component.html',
  styleUrls: ['./dialog-ver-cliente.component.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    MostrarMascotaComponent
  ],
})
export class DialogVerClienteComponent {
  domicilio: Domicilio
  mascotas!: Mascota[]
  constructor(public dialogRef: MatDialogRef<DialogVerClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente,
    public sexoService: SexoService,
    public domicilioService: DomicilioService,
    public mascotaService: MascotaService) {
      
      this.mascotas = (data) ? this.mascotaService.getMascotasbyIdCliente(data.id): []
      this.domicilio = data ? this.domicilioService.getDomiciliobyId(data.domicilio) : {
        id: 0,
        calle: '',
        numeroInterior: '',
        numeroExterior: '',
        colonia: '',
        codigoPostal: '',
        municipio: '',
        estado: '',
      }
  }

  onNoClick = (): void => {
    this.dialogRef.close();
  }

  getSexo(id: number): string {
    return this.sexoService.getSexobyId(id).nombre;
  }
}
