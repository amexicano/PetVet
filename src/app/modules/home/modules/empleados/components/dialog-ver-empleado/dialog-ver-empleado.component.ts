import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Empleado } from '../../../../../../interfaces/empleado.interface';
import { Rol } from '../../../../../../interfaces/rol.interface';
import { RolService } from '../../../../../../services/rol.service';
import { MatButtonModule } from '@angular/material/button';
import { SexoService } from '../../../../../../services/sexo.service';

@Component({
  selector: 'app-dialog-ver-empleado',
  standalone: true,
  templateUrl: './dialog-ver-empleado.component.html',
  styleUrls: ['./dialog-ver-empleado.component.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class DialogVerEmpleadoComponent {
  roles: Rol[];


  constructor(public dialogRef: MatDialogRef<DialogVerEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Empleado,
    public rolService: RolService,
    public sexoService: SexoService,) {
    this.roles = rolService.getRoles()
    }

  onNoClick = (): void => {
    this.dialogRef.close();
  }

  getRolbyId(id: number): string {
    return this.rolService.getRolbyId(id).nombre;
  }
  
  getSexo(id: number): string{
    return this.sexoService.getSexobyId(id).nombre;
  }
}
