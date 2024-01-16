import { Component } from '@angular/core';
import { ContentCardComponent } from '../../components/content-card/content-card.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    ContentCardComponent,
    LoginFormComponent
  ],
})
export class LoginComponent {
  title = 'Login'
}
