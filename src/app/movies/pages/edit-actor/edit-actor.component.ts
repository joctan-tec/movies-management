import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  DragDropConfig,
  DropFileComponent,
} from '../../../shared/drop-file/drop-file.component';
import { MatSnackBar } from '@angular/material/snack-bar';

// UI Components
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SnackBarComponent } from '../../../shared/snack-bar/snack-bar.component';
import { SnackBarConfig } from '../../../interfaces/snack-bar-config';
import { BackgroundColorSnackBar } from '../../../enums/background-color-snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Actor, Movie } from '../../interfaces/models.interfaces';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ActorService } from '../../services/actor.service';

@Component({
  selector: 'app-edit-movie',
  imports: [
    RouterModule,
    DropFileComponent,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,

  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-actor.component.html',
  styleUrl: './edit-actor.component.scss',
})
export class EditActorComponent {
  actorForm!: FormGroup;
  private _snackBar = inject(MatSnackBar);
  actorName!: string;
  isEdit = false;
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _actorService: ActorService
  ) {
    this.maxDate = new Date();
    this.actorForm = this.fb.group({
      nombre: ['', Validators.required],
      biografia: ['', Validators.required],
      fechaDeNacimiento: ['', Validators.required],
      imagenes: [''],
    });

    this.isEdit = this._router.url.includes('edit');
    if (this.isEdit) {
      this.actorName = this._router.url.split('/').pop() || '';

      if (!this.actorName) {
        this._router.navigateByUrl('/main/actors');
      }

      this.actorName = this.actorName.replace(/-/g, ' ');
      this._actorService.getActor(this.actorName).subscribe((actor:Actor) => {
        this.actorForm.get('nombre')?.setValue(actor.nombre);
        this.actorForm.get('biografia')?.setValue(actor.biografia);
        this.actorForm.get('fechaDeNacimiento')?.setValue(actor.fechaDeNacimiento);
      });
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  @ViewChild('dropFiles') dropFileRef!: DropFileComponent;

  openSnackBar(
    message: string,
    action: string,
    type: BackgroundColorSnackBar,
    time: number = 3000,
    isLoading: boolean = false
  ) {
    const config: SnackBarConfig = {
      duration: time,
      type: type,
      action: action,
      message: message,
    };

    if (isLoading) {
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
  }

  closeSnackBar() {
    this._snackBar.dismiss();
  }

  onBack() {
    this._router.navigateByUrl('/auth');
  }

  selectedFiles: File[] = []; // Almacena los archivos seleccionados por el usuario.
  mobile = false;
  isMobile: boolean = window.innerWidth <= 600; // Detecta si la pantalla es pequeña inicialmente.

  @HostListener('window:resize', ['$event'])
  onScreenResize(event: any): void {
    this.isMobile = event.target.innerWidth <= 600; // Actualiza la variable según el tamaño de pantalla.
  }

  onFileSelected(event: File[]) {
    this.selectedFiles = event;
    this.actorForm.get('imagenes')?.setValue(event);
    console.log(this.selectedFiles);
  }

  customConfig: DragDropConfig = {
    backgroundColor: '#e0f7fa',
    borderType: 'solid',
    borderColor: '#26c6da',
    color: '#004d40',
    text: "Drop it Like it's Hot",
    mobileText: 'Click to select your profile picture',
    iconName: 'file_upload',
    multiple: true,
  };

  private _infoSnackBar: SnackBarConfig = {
    duration: 5000,
    type: BackgroundColorSnackBar.INFO,
    action: 'Close',
    message: 'Loading...',
    isLoading: true,
  };

  onSubmit() {
    if (this.actorForm.invalid) {
      return;
    }

    this.openSnackBar(
      'Actualizando actor o actriz...',
      'Close',
      BackgroundColorSnackBar.INFO,
      5000,
      true
    );

    const formData = new FormData();
    formData.append('nombre', this.actorForm.get('nombre')?.value);
    formData.append('biografia', this.actorForm.get('biografia')?.value);
    formData.append('fechaDeNacimiento', this.actorForm.get('fechaDeNacimiento')?.value);
    
    if (this.selectedFiles.length) {
      this.selectedFiles.forEach((file: File) => {
        formData.append('imagenes', file, file.name);
      });
    }

    if (this.isEdit) {
      this._actorService.editActor(formData, this.actorName).subscribe({
        next: () => {
          this.openSnackBar(
            'Actor o actriz actualizado satisfactoriamente',
            'Close',
            BackgroundColorSnackBar.SUCCESS
          );
          this._router.navigateByUrl('/main/actors');
        },
        error: (error) => {
          this.openSnackBar(
            'Ocurrió un error al actualizar el actor o actriz',
            'Close',
            BackgroundColorSnackBar.ERROR
          );
        },
      });
    } else {
      this._actorService.addActor(formData).subscribe({
        next: () => {
          this.openSnackBar(
            'Actor o actriz creado satisfactoriamente',
            'Close',
            BackgroundColorSnackBar.SUCCESS
          );
          this._router.navigateByUrl('/main/actors');
        },
        error: (error) => {
          this.openSnackBar(
            'Ocurrió un error al crear el actor o actriz',
            'Close',
            BackgroundColorSnackBar.ERROR
          );
        },
      });
    }
  }
}
