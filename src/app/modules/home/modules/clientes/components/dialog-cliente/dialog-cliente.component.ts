import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../../../../../interfaces/cliente.interface';
import { SexoService } from '../../../../../../services/sexo.service';
import { DomicilioService } from '../../../../../../services/domicilio.service';
import { MascotaService } from '../../../../../../services/mascota.service';
import { Domicilio } from '../../../../../../interfaces/domicilio.interface';
import { ClientesService } from '../../../../../../services/clientes.service';
import { LocalidadService } from '../../../../../../services/localidad.service';
import { MunicipioService } from '../../../../../../services/municipio.service';
import { EstadoService } from '../../../../../../services/estado.service';
import { filter, } from 'rxjs';

interface ActionCliente{
  cliente: Cliente,
  action: string
}

@Component({
  selector: 'app-dialog-cliente',
  standalone: true,
  templateUrl: './dialog-cliente.component.html',
  styleUrls: ['./dialog-cliente.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DialogClienteComponent {
  form_cliente: FormGroup
  estadoControl: FormControl<number | null>
  municipioControl: FormControl<number | null>
  localidadControl: FormControl<number | null>
  municipios: any
  localidades: any
  newlocalidad: number = 0

  constructor(public dialogRef: MatDialogRef<DialogClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActionCliente, 
    public clienteService: ClientesService,
    public sexoService: SexoService,
    public domicilioService: DomicilioService,
    public localidadService: LocalidadService,
    public municipioService: MunicipioService,
    public estadoService: EstadoService,
    public mascotaService: MascotaService,
    public fb: FormBuilder) {

      if(data.cliente?.id){
        const domicilio = this.domicilioService.getDomiciliobyId(data.cliente.domicilio)
        const mascotas = this.mascotaService.getMascotasbyIdCliente(data.cliente.id)
        this.newlocalidad = domicilio.localidad
        this.form_cliente = fb.group({
          id: [data.cliente.id],
          nombre: [data.cliente.nombre, [Validators.required]],
          primerap: [data.cliente.primerApellido, [Validators.required]],
          segundoap: [data.cliente.segundoApellido, [Validators.required]],
          correo: [data.cliente.email, [Validators.required, Validators.email]],
          sexo: [data.cliente.sexo, [Validators.required]],
          telefono: [data.cliente.telefono, [Validators.required]],
          telefonoFijo: [data.cliente.telefonoFijo, [Validators.required]],
          curp: [data.cliente.curp.toUpperCase(), [Validators.required]],
          //Domicilio
          domid: [domicilio.id],
          calle: [domicilio.calle, [Validators.required]],
          interior: [domicilio.numeroInterior, [Validators.required]],
          exterior: [domicilio.numeroExterior, [Validators.required]],
          postal: [domicilio.codigoPostal, [Validators.required]],
          localidad: [domicilio.localidad, [Validators.required]],
          //Mascotas
          // mascotas: [mascotas, [Validators.length > 1]]
        })
        const municipio = this.municipioService.getMunicipiobyId((this.localidadService.getLocalidadbyId(domicilio.localidad).municipio_id))
        const estado = this.estadoService.getEstadobyId(municipio.estado_id)

        this.localidadControl = new FormControl<number | null>(domicilio.localidad, Validators.required)
        this.municipioControl = new FormControl<number | null>(municipio.id, Validators.required)
        this.estadoControl = new FormControl<number | null>(estado.id, Validators.required)

        this.municipios = this.municipioService.getMunicipiosbyEstadoId(estado.id)
        this.localidades = this.localidadService.getLocalidadesbyMunicipioId(municipio.id)

      } else {
        this.form_cliente = fb.group({
          id: [0],
          nombre: ['', [Validators.required]],
          primerap: ['', [Validators.required]],
          segundoap: ['', [Validators.required]],
          correo: ['', [Validators.required, Validators.email]],
          sexo: [0, [Validators.required]],
          telefono: ['', [Validators.required]],
          telefonoFijo: ['', [Validators.required]],
          curp: ['', [Validators.required]],
          //Domicilio
          domid: [0],
          calle: ['', [Validators.required]],
          interior: ['', [Validators.required]],
          exterior: ['', [Validators.required]],
          postal: ['', [Validators.required]],
          // mascotas: [[], [Validators.length > 1]]
        })  
        this.estadoControl = new FormControl<number | null>(null, Validators.required)
        this.municipioControl = new FormControl<number | null>(null, Validators.required)
        this.localidadControl = new FormControl<number | null>(null, Validators.required)
      }

    this.estadoControl.valueChanges
      .pipe(
        // Filter null value and Estado
        filter((value): value is number => value !== null),
      ).forEach(element => {
        this.municipioControl.reset()
        this.localidadControl.reset()
        this.municipios = this.municipioService.getMunicipiosbyEstadoId(element)
      });

    this.municipioControl.valueChanges
      .pipe(
        // Filter null value and Estado
        filter((value): value is number => value !== null),
      ).forEach(element => {
        this.localidadControl.reset()
        this.localidades = this.localidadService.getLocalidadesbyMunicipioId(element)
    });

    this.localidadControl.valueChanges
      .pipe(
        // Filter null value and Estado
        filter((value): value is number => value !== null),
      ).forEach(element => {
        this.newlocalidad = element
      });

  }



  saveCliente(): void{
    if(this.newlocalidad){
      const data_cliente = this.form_cliente.value

      const domicilio: Domicilio = {
        id: data_cliente.domid,
        calle: data_cliente.calle,
        numeroInterior: data_cliente.interior,
        numeroExterior: data_cliente.exterior,
        codigoPostal: data_cliente.postal,
        localidad: this.newlocalidad
      }

      let cliente: Cliente = {
        id: data_cliente.id,
        nombre: data_cliente.nombre,
        primerApellido: data_cliente.primerap,
        segundoApellido: data_cliente.segundoap,
        email: data_cliente.correo,
        sexo: data_cliente.sexo,
        telefono: data_cliente.telefono,
        telefonoFijo: data_cliente.telefonoFijo,
        curp: data_cliente.curp,
        domicilio: data_cliente.domid
      }

      

      if (cliente.id) {
        this.domicilioService.updateDomicilio(domicilio)
        this.clienteService.updateCliente(cliente)
      } else {
        cliente.domicilio = this.domicilioService.addDomicilio(domicilio).id
        this.clienteService.addCliente(cliente)
      }
    }

    this.dialogRef.close()
  }
  
}
