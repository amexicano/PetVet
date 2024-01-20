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
import { MascotaService } from '../../../../../../services/mascota.service';
import { Domicilio } from '../../../../../../interfaces/domicilio.interface';
import { ClientesService } from '../../../../../../services/clientes.service';
import { LocalidadService } from '../../../../../../services/localidad.service';
import { MunicipioService } from '../../../../../../services/municipio.service';
import { EstadoService } from '../../../../../../services/estado.service';
import { filter, } from 'rxjs';
import { AgregarMascotaComponent } from '../../../../components/agregar-mascota/agregar-mascota.component';
import { Sexo } from '../../../../../../interfaces/sexo.interface';
import { Estado } from '../../../../../../interfaces/estado.interface';
import { Municipio } from '../../../../../../interfaces/municipio.interface';
import { Localidad } from '../../../../../../interfaces/localidad.interface';

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
    AgregarMascotaComponent,
  ]
})
export class DialogClienteComponent {
  // Validaciones
  form_cliente: FormGroup
  estadoControl: FormControl<number | null>
  municipioControl: FormControl<number | null>
  localidadControl: FormControl<number | null>
  
  // Datos
  sexos: Sexo[] = []
  estados: Estado[] = []
  municipios: Municipio[] = []
  localidades: Localidad[] = []
  newlocalidad: number = 0

  constructor(public dialogRef: MatDialogRef<DialogClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActionCliente, 
    private clienteService: ClientesService,
    private sexoService: SexoService,
    public localidadService: LocalidadService,
    public municipioService: MunicipioService,
    public estadoService: EstadoService,
    public mascotaService: MascotaService,
    public fb: FormBuilder) {

      this.initForm()

      if(data.cliente?.id){

        let id_municipio = 0
        let id_estado = 0
        let id_localidad = 0

        this.localidadService.getLocalidadbyId(data.cliente.domicilio.localidad)
          .subscribe({
            next: (data: Localidad) => {
              id_localidad = data.id
            },
            complete: () => {
              
            }
          })

          console.log(id_localidad)
        // this.municipioService.getMunicipiosbyEstadoId(estado.id)
        //   .subscribe({
        //     next: (data: Municipio[]) => {
        //       this.municipios = data
        //     },
        //     error: error => {
        //       console.log(error)
        //     }
        //   })

        // this.localidadService.getLocalidadesbyMunicipioId(municipio.id)
        //   .subscribe({
        //     next: (data: Localidad[]) => {
        //       this.localidades = data
        //     },
        //     error: error => {
        //       console.log(error)
        //     }
        //   })

        this.localidadControl = new FormControl<number | null>(id_localidad, Validators.required)
        this.municipioControl = new FormControl<number | null>(id_municipio, Validators.required)
        this.estadoControl = new FormControl<number | null>(id_estado, Validators.required)

        this.form_cliente = fb.group({
          id: [data.cliente.id],
          nombre: [data.cliente.nombre, [Validators.required]],
          primerap: [data.cliente.primerApellido, [Validators.required]],
          segundoap: [data.cliente.segundoApellido, [Validators.required]],
          correo: [data.cliente.email, [Validators.required, Validators.email]],
          sexo: [data.cliente.sexo.id, [Validators.required]],
          telefono: [data.cliente.telefono, [Validators.required]],
          telefonoFijo: [data.cliente.telefonoFijo, [Validators.required]],
          curp: [data.cliente.curp.toUpperCase(), [Validators.required]],
          //Domicilio
          domid: [data.cliente.domicilio.id],
          calle: [data.cliente.domicilio.calle, [Validators.required]],
          interior: [data.cliente.domicilio.numeroInterior, [Validators.required]],
          exterior: [data.cliente.domicilio.numeroExterior, [Validators.required]],
          postal: [data.cliente.domicilio.codigoPostal, [Validators.required]],
          localidad: this.localidadControl,
          municipio: this.municipioControl,
          estado: this.estadoControl,
          //Mascotas
          // mascotas: [mascotas, [Validators.length > 1]]
        })

      } else {
        this.estadoControl = new FormControl<number | null>(null, Validators.required)
        this.municipioControl = new FormControl<number | null>(null, Validators.required)
        this.localidadControl = new FormControl<number | null>(null, Validators.required)

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
          localidad: this.localidadControl,
          municipio: this.municipioControl,
          estado: this.estadoControl,
          // mascotas: [[], [Validators.length > 1]]
        })  
      }

      this.detectedChanges()
  }

  initForm(): void{
    this.sexoService.getSexos()
      .subscribe((data: Sexo[]) => {
        this.sexos = data
      })

    this.estadoService.getEstados()
      .subscribe((data: Estado[]) => {
        this.estados = data
      })
  }

  detectedChanges(): void{
    this.estadoControl.valueChanges
      .pipe(
        // Filter null value and Estado
        filter((value): value is number => value !== null),
      ).forEach(element => {
        this.municipioControl.reset()
        this.localidadControl.reset()
        this.municipioService.getMunicipiosbyEstadoId(element)
          .subscribe({
            next: (data: Municipio[]) => {
              this.municipios = data
            },
            error: error => {
              console.log(error)
            }
          })
      });

    this.municipioControl.valueChanges
      .pipe(
        // Filter null value and Estado
        filter((value): value is number => value !== null),
      ).forEach(element => {
        this.localidadControl.reset()
        this.localidadService.getLocalidadesbyMunicipioId(element)
          .subscribe({
            next: (data: Localidad[]) => {
              this.localidades = data
            },
            error: error => {
              console.log(error)
            }
          })
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
        domicilio: domicilio
      }

      if (cliente.id) {
        this.clienteService.updateCliente(cliente)
      } else {
        this.clienteService.addCliente(cliente)
      }
    }

    this.dialogRef.close()
  }
  
}
