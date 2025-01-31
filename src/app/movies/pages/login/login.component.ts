import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { CommonModule } from '@angular/common';


// UI Components 
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { SnackBarComponent } from '../../../shared/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarConfig } from '../../../interfaces/snack-bar-config';
import { BackgroundColorSnackBar } from '../../../enums/background-color-snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, 
            CommonModule,
            MatInputModule,
            MatFormFieldModule,
            MatButtonModule,
            MatIconModule
          ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  loginForm!: FormGroup;
  private _snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder, private userService: UserService, private _router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  private _infoSnackBar : SnackBarConfig = {
    duration: 5000,
    type: BackgroundColorSnackBar.INFO,
    action: 'Close',
    message: 'Loading...',
    isLoading: true
  };


  private _failSnackBar : SnackBarConfig = {
    duration: 5000,
    type: BackgroundColorSnackBar.ERROR,
    action: 'Close',
    message: 'Error: Invalid email or password',
  };

  openSnackBar(config: SnackBarConfig) {
    if (config.isLoading) {
      this._snackBar.openFromComponent(SnackBarComponent, {
        data: config,
        panelClass: [config.type],
        horizontalPosition: 'center',
      verticalPosition: 'top',
      });
      return;
    }
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: config,
      duration: config.duration,
      panelClass: [config.type], // Aplica la clase basada en el tipo
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }	

  closeSnackBar() {
    this._snackBar.dismiss();
  }

  onRegister() {
    this._router.navigateByUrl('/register');
  }

  

  onSubmit() {

    if (this.loginForm.invalid) {

      return;
    }

    const formData = new FormData();
    formData.append('email', this.loginForm.get('email')?.value);
    formData.append('password', this.loginForm.get('password')?.value);
    this.openSnackBar(this._infoSnackBar);    

    this.userService.login(formData).subscribe({
      next: (response) => {
        this.closeSnackBar();
        this._router.navigateByUrl('/main');
        
      },
      error: (error) => {
        this.openSnackBar(this._failSnackBar);

      }
    })
    
  }

}
