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
import { Movie } from '../../interfaces/models.interfaces';
import { MovieService } from '../../services/movie.service';

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
  ],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.scss',
})
export class EditMovieComponent {
  movieForm!: FormGroup;
  private _snackBar = inject(MatSnackBar);
  movieName!: string;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _movieService: MovieService
  ) {
    this.movieForm = this.fb.group({
      titulo: ['', Validators.required],
      director: ['', Validators.required],
      descripcion: ['', Validators.required],
      calificacion: [
        '',
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      ano_lanzamiento: ['', Validators.required],
      genero: ['', Validators.required],
      imagenes: [''],
    });

    this.isEdit = this._router.url.includes('edit');
    console.log(this.isEdit);
    if (this.isEdit) {
      this.movieName = this._router.url.split('/').pop() || '';

      if (!this.movieName) {
        this._router.navigateByUrl('/main/movies');
      }

      this.movieName = this.movieName.replace(/-/g, ' ');
      this._movieService
        .getMovieByName(this.movieName)
        .subscribe((movie: Movie) => {
          this.movieForm.patchValue(movie);
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
    this.movieForm.get('images')?.setValue(event);
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
    if (this.movieForm.invalid) {
      return;
    }

    this.openSnackBar(
      'Actualizando película...',
      'Close',
      BackgroundColorSnackBar.INFO,
      5000,
      true
    );

    const formData = new FormData();
    formData.append('titulo', this.movieForm.get('titulo')?.value);
    formData.append('director', this.movieForm.get('director')?.value);
    formData.append('descripcion', this.movieForm.get('descripcion')?.value);
    formData.append('calificacion', this.movieForm.get('calificacion')?.value);
    formData.append(
      'ano_lanzamiento',
      this.movieForm.get('ano_lanzamiento')?.value
    );
    formData.append('genero', this.movieForm.get('genero')?.value);

    if (this.selectedFiles.length) {
      this.selectedFiles.forEach((file: File) => {
        formData.append('imagenes', file, file.name);
      });
    }

    if (this.isEdit) {
      this._movieService.updateMovie(formData, this.movieName).subscribe({
        next: () => {
          this.openSnackBar(
            'Película actualizada satisfactoriamente',
            'Close',
            BackgroundColorSnackBar.SUCCESS
          );
          this._router.navigateByUrl('/main/movies');
        },
        error: (error) => {
          this.openSnackBar(
            'Ocurrió un error al actualizar la película',
            'Close',
            BackgroundColorSnackBar.ERROR
          );
        },
      });
    } else {
      this._movieService.createMovie(formData).subscribe({
        next: () => {
          this.openSnackBar(
            'Película creada satisfactoriamente',
            'Close',
            BackgroundColorSnackBar.SUCCESS
          );
          this._router.navigateByUrl('/main/movies');
        },
        error: (error) => {
          this.openSnackBar(
            'Ocurrió un error al crear la película',
            'Close',
            BackgroundColorSnackBar.ERROR
          );
        },
      });
    }
  }
}
