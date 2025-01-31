import {ChangeDetectionStrategy, Component, HostListener, inject, signal, ViewChild} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


// UI Components 
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { DropFileComponent, DragDropConfig } from '../../../shared/drop-file/drop-file.component';
import { UserService } from '../../services/user.service';
import { SnackBarComponent } from '../../../shared/snack-bar/snack-bar.component';
import { BackgroundColorSnackBar } from '../../../enums/background-color-snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarConfig } from '../../../interfaces/snack-bar-config';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, 
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    DropFileComponent
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  @ViewChild('dropFiles') dropFileRef!: DropFileComponent;

  private _infoSnackBar : SnackBarConfig = {
    duration: 5000,
    type: BackgroundColorSnackBar.INFO,
    action: 'Close',
    message: 'Loading...',
    isLoading: true
  };

  private _snackBar = inject(MatSnackBar);
  
    openSnackBar(message: string, action: string, type : BackgroundColorSnackBar, time: number = 3000, isLoading: boolean = false) {
      const config: SnackBarConfig = {
        duration: time,
        type: type,
        action: action,
        message: message
      };

      if(isLoading){
        config.isLoading = true;
        this._snackBar.openFromComponent(SnackBarComponent, {
          data: this._infoSnackBar,
          panelClass: [this._infoSnackBar.type], // Aplica la clase basada en el tipo
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        return;
      }

      this._snackBar.openFromComponent(SnackBarComponent, {
        data: config,
        duration: config.duration,
        panelClass: [type], // Aplica la clase basada en el tipo
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    };

  closeSnackBar() {
    this._snackBar.dismiss();
  }

  
  onFileSelected(event: File[]) {
    this.selectedFiles = event;
    this.registerForm.get('picture')?.setValue(event); // Actualizar el control
  }


  customConfig: DragDropConfig = {
    backgroundColor: '#e0f7fa',
    borderType: 'solid',
    borderColor: '#26c6da',
    color: '#004d40',
    text: 'Drop it Like it\'s Hot',
    mobileText: 'Click to select your profile picture',
    iconName: 'file_upload',
    multiple: true
  };
  

  registerForm!: FormGroup;
  selectedFiles: File[] = [];
  maxDate: Date;
  mobile = false;

  constructor(private fb: FormBuilder, private userService: UserService, private _router: Router) {
    this.maxDate = new Date();
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      bornDate: ['', [Validators.required]],
      picture: ['']
    });
  }

  onBack() {
    this._router.navigateByUrl('/auth');
  }

  isMobile: boolean = window.innerWidth <= 600; // Detecta si la pantalla es pequeña inicialmente.

  @HostListener('window:resize', ['$event'])
  onScreenResize(event: any): void {
    this.isMobile = event.target.innerWidth <= 600; // Actualiza la variable según el tamaño de pantalla.
  }

 

  onSubmit() {
    if (this.registerForm.valid) {
      this.openSnackBar('Creating user...', 'Close', BackgroundColorSnackBar.INFO, 5000, true);
      const formData = new FormData();
      formData.append('userName', this.registerForm.get('userName')?.value);
      formData.append('email', this.registerForm.get('email')?.value);
      formData.append('password', this.registerForm.get('password')?.value);
      formData.append('bornDate', this.registerForm.get('bornDate')?.value.toISOString());

      console.log('Formulario:', this.registerForm.value);

      // Agregar archivos al FormData
      this.selectedFiles.forEach((file) => {
        formData.append('images', file, file.name);
      });

      this.userService.createUserWithImages(formData).subscribe({
        next: (response) => {
          this.closeSnackBar();
          this.openSnackBar('User created successfully', 'Close', BackgroundColorSnackBar.SUCCESS, 5000);
          this._router.navigateByUrl('/auth');
          
        },
        error: (error) => {
          this.closeSnackBar();
          this.openSnackBar('Error creating user', 'Close', BackgroundColorSnackBar.ERROR, 5000);
        },
      });
    }
  }
}
