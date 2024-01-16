import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
// Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
// Reactive Forms, Form Builder 
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Router && RouterModule
import { RouterModule, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterModule,
  ],

})
export class LoginFormComponent {
  form: FormGroup;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder, 
    private _snackBar: MatSnackBar, 
    private router: Router) { 
    this.form = fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    }); 
  }

  ingresar = () : void => {
    const user = this.form.value.usuario;
    const pass = this.form.value.password;

    this.accountService.login(user, pass)
      // Tomar el primer elemento del flujo de datos
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          this.router.navigate(['/home']);
        },
        error: (error:string) =>{
          this.error(error);        
        }
      });
  }

  error = (error: string) : void => {
    this._snackBar.open(error, '', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

}
