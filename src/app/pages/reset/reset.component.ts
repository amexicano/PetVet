import { Component } from '@angular/core';
import { ContentCardComponent } from '../../components/content-card/content-card.component';
import { ResetFormComponent } from '../../components/reset-form/reset-form.component';

@Component({
  selector: 'app-reset',
  standalone: true,
  templateUrl: './reset.component.html',
  imports: [
    ContentCardComponent,
    ResetFormComponent,
  ],
})
export class ResetComponent {
  title = '¿Olvidaste tu contraseña?'
}
