import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from '../../../../../../interfaces/cliente.interface';
import { Domicilio } from '../../../../../../interfaces/domicilio.interface';
import { Mascota } from '../../../../../../interfaces/mascota.interface';
import { MascotaService } from '../../../../../../services/mascota.service';
import { MatChipsModule } from '@angular/material/chips';
import { Localidad } from '../../../../../../interfaces/localidad.interface';
import { LocalidadService } from '../../../../../../services/localidad.service';
import { MunicipioService } from '../../../../../../services/municipio.service';
import { EstadoService } from '../../../../../../services/estado.service';
import { Municipio } from '../../../../../../interfaces/municipio.interface';
import { Estado } from '../../../../../../interfaces/estado.interface';
import { switchMap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule,
  ],
})
export class DialogVerClienteComponent {
  mascotas: Mascota[] = []
  domicilio!: Domicilio
  localidad!: Localidad
  municipio!: Municipio
  estado!: Estado
  
  constructor(public dialogRef: MatDialogRef<DialogVerClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente,
    public localidadService: LocalidadService,
    public municipioService: MunicipioService,
    public estadoService: EstadoService,
    public mascotaService: MascotaService) {
      if(data){
        this.mascotaService.getMascotasbyIdCliente(data.id).subscribe({
          next: (data: Mascota[]) => {
            this.mascotas = data
          }
        })

        this.domicilio = data.domicilio

        this.localidadService.getLocalidadbyId(data.domicilio.localidad)
        .pipe(
          switchMap((data: Localidad) => {
            this.localidad = { ...data}
            return this.municipioService.getMunicipiobyId(data.municipio)
          }),
          switchMap((data: Municipio) => {
            this.municipio = { ...data}
            return this.estadoService.getEstadobyId(data.estado)
          })
        )
        .subscribe({           
          next: (data: Estado) => {
            this.estado = {...data}
          }
        })
      } 
  }

  onNoClick = (): void => {
    this.dialogRef.close();
  }
}
