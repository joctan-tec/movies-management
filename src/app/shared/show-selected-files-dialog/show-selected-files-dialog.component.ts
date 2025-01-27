import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BytesPipe } from '../../pipes/bytes.pipe';


@Component({
  selector: 'app-show-selected-files-dialog',
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule, BytesPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './show-selected-files-dialog.component.html',
  styleUrl: './show-selected-files-dialog.component.scss',
  standalone: true,
})
export class FileListDialogComponent {
  readonly dialogRef = inject(MatDialogRef<FileListDialogComponent>);
  files = inject<File[]>(MAT_DIALOG_DATA);

  closeDialog(): void {
    this.dialogRef.close(this.files, );
  }

  getImageSrc(file: File): string {
    return URL.createObjectURL(file);
}

  removeFile(file: File): void {
    const index = this.files.indexOf(file);
    if (index !== -1) {
      this.files.splice(index, 1);
    }
  }
}
