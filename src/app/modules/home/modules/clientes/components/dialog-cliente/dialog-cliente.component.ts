import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../../../../../interfaces/cliente.interface';
import { SexoService } from '../../../../../../services/sexo.service';
import { MascotaService } from '../../../../../../services/mascota.service';
import { Domicilio } from '../../../../../../interfaces/domicilio.interface';
import { ClientesService } from '../../../../../../services/clientes.service';
import { LocalidadService } from '../../../../../../services/localidad.service';
import { MunicipioService } from '../../../../../../services/municipio.service';
import { EstadoService } from '../../../../../../services/estado.service';
import { filter, switchMap, } from 'rxjs';

import { Sexo } from '../../../../../../interfaces/sexo.interface';
import { Estado } from '../../../../../../interfaces/estado.interface';
import { Municipio } from '../../../../../../interfaces/municipio.interface';
import { Localidad } from '../../../../../../interfaces/localidad.interface';
import { MatDividerModule } from '@angular/material/divider';
import { Mascota } from '../../../../../../interfaces/mascota.interface';
import { Raza } from '../../../../../../interfaces/raza.interface';
import { RazaService } from '../../../../../../services/raza.service';

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
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DialogClienteComponent {
  // Validaciones
  form_cliente: FormGroup
  estadoControl: FormControl<number | null> = new FormControl<number | null>(null, Validators.required)
  municipioControl: FormControl<number | null> = new FormControl<number | null>(null, Validators.required)
  localidadControl: FormControl<number | null> = new FormControl<number | null>(null, Validators.required)
  
  // Datos
  sexos: Sexo[] = []
  estados: Estado[] = []
  municipios: Municipio[] = []
  localidades: Localidad[] = []
  newlocalidad: number = 0

  mascotas!: Mascota[]
  razas!: Raza[]


  constructor(public dialogRef: MatDialogRef<DialogClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActionCliente, 
    private clienteService: ClientesService,
    private sexoService: SexoService,
    public localidadService: LocalidadService,
    public municipioService: MunicipioService,
    public estadoService: EstadoService,
    public mascotaService: MascotaService,
    public razaService: RazaService,
    public fb: FormBuilder) {
      

      // Form Values of Sexo
      this.sexoService.getSexos()
      .subscribe((data: Sexo[]) => {
        this.sexos = data
      })

      // Form Values of Estado
      this.estadoService.getEstados()
      .subscribe((data: Estado[]) => {
        this.estados = data
      })

      // Form Values of Raza
      this.razaService.getRazas()
      .subscribe((data: Raza[]) => {
        this.razas = data
      })

      if(data.cliente != null && data.cliente?.id){
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
          // Mascotas
          mascotas: fb.array([])
        })

        this.mascotaService.getMascotasbyIdCliente(data.cliente.id)
        .subscribe((data: Mascota[]) => {
          this.mascotas = data
          data.forEach((mascota: Mascota) => {
            // Add Mascota to FormArray
            let mascotaGroup = this.fb.group({
              id: [mascota.id],
              nombre: [mascota.nombre],
              raza: [mascota.raza],
              descripcion: [mascota.descripcion],
              activo: [mascota.activo],
            })
            this.mascotasFormArray.push(mascotaGroup)
          })
        })

        this.initForm(data.cliente.domicilio)

      }else{
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
          mascotas: fb.array([
            fb.group({
              id: [0],
              nombre: [''],
              raza: [''],
              descripcion: [''],
              activo: [''],
            })
          ])
        })  

        this.detectedChanges()
      }
  }

  get mascotasFormArray(): FormArray {
    return this.form_cliente.controls['mascotas'] as FormArray
  }

  eliminarMascota() {
    this.mascotasFormArray.removeAt(this.mascotasFormArray.length - 1)
  }

  agregarMascota() {
    this.mascotasFormArray.push(this.fb.group({
      id: [0],
      nombre: [''],
      raza: [''],
      descripcion: [''],
      activo: [''],
    }))
  }


  saveCliente(): void {
    let newmascotas: Mascota[] = []

    this.mascotasFormArray.controls
    .forEach((mascota) => {
      let newMascota: Mascota = {
        id: mascota.value.id,
        nombre: mascota.value.nombre,
        descripcion: mascota.value.descripcion,
        activo: mascota.value.activo,
        raza: mascota.value.raza,
        cliente: this.form_cliente.value.id
      }
      newmascotas.push(newMascota)
    })

    const data_cliente = this.form_cliente.value
    
    let cliente = {
      id: data_cliente.id,
      nombre: data_cliente.nombre,
      primerApellido: data_cliente.primerap,
      segundoApellido: data_cliente.segundoap,
      email: data_cliente.correo,
      sexo: data_cliente.sexo,
      telefono: data_cliente.telefono,
      telefonoFijo: data_cliente.telefonoFijo,
      curp: data_cliente.curp,
      domicilio: {
        id: data_cliente.domid,
        calle: data_cliente.calle,
        numeroInterior: data_cliente.interior,
        numeroExterior: data_cliente.exterior,
        codigoPostal: data_cliente.postal,
        localidad: this.newlocalidad,
      },
      mascotas: [...newmascotas]
    }

    if (cliente.id) {
      this.clienteService.updateCliente(cliente).
        subscribe((data: Cliente) => {})
    } else {
      this.clienteService.addCliente(cliente)
        .subscribe((data: Cliente) => {})
    }

    this.dialogRef.close()
  }

  detectedChanges(): void {
    this.estadoControl.valueChanges
    .pipe(
      filter((value): value is number => value !== null),
      switchMap((value: number) => {
        this.municipioControl.reset()
        this.localidadControl.reset()
        return this.municipioService.getMunicipiosbyEstadoId(value)
      })
    )
    .subscribe((data: Municipio[]) => {
      this.municipios = data
    },)

    this.municipioControl.valueChanges
    .pipe(
      filter((value): value is number => value !== null),
      switchMap((value: number) => {
        this.localidadControl.reset()
        return this.localidadService.getLocalidadesbyMunicipioId(value)
      })
    )
    .subscribe((data: Localidad[]) => {
      this.localidades = data
    },)

    this.localidadControl.valueChanges
    .pipe(
      filter((value): value is number => value !== null),
    )
    .subscribe(element => {
      this.newlocalidad = element
    })
  }

  initForm(domicilio: Domicilio){
    let id_estado = 0
    let id_municipio = 0

    // Form Values of Localidad, Municipio
    // Initial values of Localidad, Municipio, Estado
    this.localidadService.getLocalidadbyId(domicilio.localidad)
      .pipe(
        switchMap((data: Localidad) => {
          this.newlocalidad = data.id

          // Form Values of Localidad
          this.localidadService.getLocalidadesbyMunicipioId(data.municipio)
          .subscribe((data: Localidad[]) => {
            this.localidades = data
          })
          
          return this.municipioService.getMunicipiobyId(data.municipio)
        }),
        switchMap((data: Municipio) => {
          id_municipio = data.id

          // Form Values of Municipio
          this.municipioService.getMunicipiosbyEstadoId(data.estado)
          .subscribe((data: Municipio[]) => {
            this.municipios = data
          })

          return this.estadoService.getEstadobyId(data.estado)
        }),
      )
      .subscribe({
        next: (data: Estado) => {
          id_estado = data.id
          this.localidadControl = new FormControl<number | null>(this.newlocalidad, Validators.required)
          this.municipioControl = new FormControl<number | null>(id_municipio, Validators.required)
          this.estadoControl = new FormControl<number | null>(id_estado, Validators.required)

          this.detectedChanges()
        }
      })
  }
}
