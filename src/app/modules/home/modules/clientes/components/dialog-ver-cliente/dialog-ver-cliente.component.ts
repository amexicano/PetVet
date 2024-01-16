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
import { Localidad } from '../../../../../../interfaces/localidad.interface';
import { LocalidadService } from '../../../../../../services/localidad.service';
import { MunicipioService } from '../../../../../../services/municipio.service';
import { EstadoService } from '../../../../../../services/estado.service';
import { Municipio } from '../../../../../../interfaces/municipio.interface';
import { Estado } from '../../../../../../interfaces/estado.interface';
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
  mascotas!: Mascota[]
  domicilio!: Domicilio
  localidad!: Localidad
  municipio!: Municipio
  estado!: Estado

  constructor(public dialogRef: MatDialogRef<DialogVerClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente,
    public sexoService: SexoService,
    public domicilioService: DomicilioService,
    public localidadService: LocalidadService,
    public municipioService: MunicipioService,
    public estadoService: EstadoService,
    public mascotaService: MascotaService) {
      
      this.mascotas = (data) ? this.mascotaService.getMascotasbyIdCliente(data.id): []
      this.domicilio = data ? this.domicilioService.getDomiciliobyId(data.domicilio) : {
        id: 0,
        calle: '',
        numeroInterior: '',
        numeroExterior: '',
        localidad: 0,
        codigoPostal: '',
      }
      this.localidad = this.localidadService.getLocalidadbyId(this.domicilio.localidad)
      this.municipio = this.municipioService.getMunicipiobyId(this.localidad.municipio_id)
      this.estado = this.estadoService.getEstadobyId(this.municipio.estado_id)
  }

  onNoClick = (): void => {
    this.dialogRef.close();
  }

  getSexo(id: number): string {
    return this.sexoService.getSexobyId(id).nombre;
  }
}
