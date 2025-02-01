import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatButtonModule,MatCardModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {


  constructor(
    public dialogRef:MatDialogRef<ConfirmDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data:any
  ){}

  onConfirm():void{
    this.dialogRef.close(true)
  }

  onNoClick(){
    this.dialogRef.close(false)
  }
}
