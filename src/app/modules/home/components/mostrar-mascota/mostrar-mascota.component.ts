import { Component, Input } from '@angular/core';
import { Mascota } from '../../../../interfaces/mascota.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-mostrar-mascota',
  standalone: true,
  templateUrl: './mostrar-mascota.component.html',
  styleUrls: ['./mostrar-mascota.component.css'],
  imports: [
    MatIconModule,
    MatChipsModule,
  ],

})
export class MostrarMascotaComponent {
  @Input() mascota!: Mascota

}
