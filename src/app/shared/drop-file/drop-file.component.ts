import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileListDialogComponent } from '../show-selected-files-dialog/show-selected-files-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { BackgroundColorSnackBar } from '../../enums/background-color-snack-bar';
import { SnackBarConfig } from '../../interfaces/snack-bar-config';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

export interface DragDropConfig {
  backgroundColor: string;
  borderType: string;
  borderColor: string;
  color: string;
  text: string;
  mobileText: string;
  iconName: string;

  multiple: boolean;
}



@Component({
  selector: 'app-drop-file',
  imports: [MatIconModule, CommonModule, MatBadgeModule],
  templateUrl: './drop-file.component.html',
  styleUrl: './drop-file.component.scss',
})
export class DropFileComponent {

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string, type : BackgroundColorSnackBar, time: number = 3000) {
    const config: SnackBarConfig = {
      duration: time,
      type: type,
      action: action,
      message: message
    };
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: config,
      duration: config.duration,
      panelClass: [type], // Aplica la clase basada en el tipo
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

      
  }

  defaultConfig: DragDropConfig = {
    backgroundColor: '#f5f5f5',
    borderType: 'dashed',
    borderColor: '#888',
    color: '#888',
    text: 'Drop your files here',
    mobileText: 'Click to select files',
    iconName: 'cloud_upload',
    multiple: true,
  };

  @Output() onFilesChange: EventEmitter<File[]> =  new EventEmitter<File[]>();

  @Input() config: DragDropConfig = this.defaultConfig;
  files: File[] = [];
  filesUndo: File[] = [];
  readonly dialog = inject(MatDialog);

  constructor(private cdr: ChangeDetectorRef) {
    this.config = { ...this.defaultConfig, ...this.config };
  }

  addFile(file: File): void {
    const validationError = this.validateFile(file);
  
    if (validationError) {
      this.openSnackBar(validationError, 'Close', BackgroundColorSnackBar.ERROR, 5000);
      return;
    }
  
    if (this.config.multiple) {
      this.files.push(file);
    } else {
      this.files = [file];
    }
  
    this.emitFilesChange();
  }
  
  addFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i)!;
      this.addFile(file); // Usa `addFile` para cada archivo individual.
      if (!this.config.multiple) break; // Si no se permite múltiples, detener después de agregar uno.
    }
  }
  
  private emitFilesChange(): void {
    this.onFilesChange.emit(this.files);
  }
  
  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.addFiles(target.files); // Reutiliza `addFiles`.
    }
  }
  
  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) {
      this.addFiles(event.dataTransfer.files); // Reutiliza `addFiles`.
    }
  }

  undoFile(): void {
    if (this.files.length > 0) {
      const file = this.files.pop()!;
      this.filesUndo.push(file);
      this.emitFilesChange();
    }
    if (this.files.length === 0) {
      this.filesUndo = [];
    }
  }
  
  redoFile(): void {
    if(this.filesUndo.length === 0){
      this.openSnackBar('No files to redo', 'Close', BackgroundColorSnackBar.INFO, 5000);
      return;
    }
    if (this.filesUndo.length > 0) {
      const file = this.filesUndo.pop()!;
      this.addFile(file); // Reutiliza `addFile` para manejar validaciones y actualizaciones.
    }
  }
  

  get filesLength(): number {
    return this.files.length;
  }

  openFileDialog(): void {
    const dialogRef = this.dialog.open(FileListDialogComponent, {
      data: this.files,
      width: '500px', // Ancho fijo
      height: '600px', // Alto fijo
      panelClass: 'custom-dialog-container', // Clase personalizada
    });

    dialogRef.afterClosed().subscribe(updatedFiles => {
      console.log('The dialog was closed: ', updatedFiles);
      if (updatedFiles) {
        this.files = [...updatedFiles];
        this.cdr.detectChanges(); // Fuerza la actualización de la vista
        console.log('Files Nuevos: ', this.files, 'Files Length: ', this.filesLength);	
      }
    });
  }

  validateFile(file: File): string | null {
    // Valida un archivo y devuelve un mensaje de error si no cumple con los requisitos, o null si es válido.
    if (file.size >= 500000) {
      return `The file ${file.name} is too big. Max size: 500KB.`;
    }
    if (!file.type.includes('image')) {
      return `The file ${file.name} is not an image.`;
    }
    if (this.files.length >= 10) {
      return 'You can only upload 10 files.';
    }
    return null; // El archivo es válido.
  }

  getFiles(): File[] {
    return this.files;
  }

  removeFile(file: File) {
    this.files = this.files.filter((f) => f !== file);
  }

  clearFiles() {
    this.files = [];

  }

  preventDefault(event: Event) {
    event.preventDefault();
  }
}
