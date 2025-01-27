import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { CommonModule } from '@angular/common';


// UI Components 
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { UserService } from '../../services/user.service';


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

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }



    console.log('email: ', this.loginForm.get('email')?.value);
    console.log('password: ', this.loginForm.get('password')?.value);
    const formData = new FormData();
    formData.append('email', this.loginForm.get('email')?.value);
    formData.append('password', this.loginForm.get('password')?.value);

    this.userService.login(formData).subscribe({
      next: (response) => {
        console.log('response: ', response);
      },
      error: (error) => {
        console.log('error: ', error);
      }
    })
    
  }

}
