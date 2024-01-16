import { Component } from '@angular/core';
// Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
// Reactive Forms, Form Builder
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Router && RouterModule
import { RouterModule, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-form',
  standalone: true,
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})

export class ResetFormComponent {
  reset: FormGroup;

  constructor( private fb :FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.reset = fb.group({
      //Validate email
      correo: ['', [Validators.required, Validators.email]],
    });
  }
  
  resetPassword = () : void => {
    const email = this.reset.value.correo;
    
    this._snackBar.open(`Contraseña enviada al correo ${email}`, '', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
    this.router.navigate(['']);
  }
}
