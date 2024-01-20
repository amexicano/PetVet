import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from '../../../../../../interfaces/cliente.interface';
import { Domicilio } from '../../../../../../interfaces/domicilio.interface';
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
  mascotas: Mascota[] = []
  domicilio: Domicilio = {
    id: 0,
    calle: '',
    numeroInterior: '',
    numeroExterior: '',
    localidad: 0,
    codigoPostal: '',
  }
  localidad: Localidad = {
    id: 0,
    nombre: '',
    municipio: 0
  }

  municipio: Municipio = {
    id: 0,
    nombre: '',
    estado: 0
  }
  
  estado: Estado = {
    id: 0,
    nombre: '',
    siglas: ''
  }

  constructor(public dialogRef: MatDialogRef<DialogVerClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente,
    public localidadService: LocalidadService,
    public municipioService: MunicipioService,
    public estadoService: EstadoService,
    public mascotaService: MascotaService) {
      if(data){
        //this.mascotas = this.mascotaService.getMascotasbyIdCliente(data.id)
        this.domicilio = data.domicilio

        this.localidadService.getLocalidadbyId(data.domicilio.localidad)
        .subscribe({
          next:(data: Localidad) => {
            this.localidad = {...data}
          },
          complete: () => {
            this.municipioService.getMunicipiobyId(this.localidad.municipio)
              .subscribe({
                next: (data: Municipio) => {
                  this.municipio = data
                },
                complete: () => {
                  this.estadoService.getEstadobyId(this.municipio.estado)
                    .subscribe({
                      next: (data: Estado) => {
                        this.estado = data
                      }
                    })
                }
            })
          }
        })
      } 
  }

  onNoClick = (): void => {
    this.dialogRef.close();
  }
}
