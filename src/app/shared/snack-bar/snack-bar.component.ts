import { Component, Inject, inject, Input } from '@angular/core';

import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { BackgroundColorSnackBar } from '../../enums/background-color-snack-bar';
import { SnackBarConfig } from '../../interfaces/snack-bar-config';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-snack-bar',
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, CommonModule, MatIconModule],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss'

})
export class SnackBarComponent {

  configDefault: SnackBarConfig = {
    duration: 3000,
    type: BackgroundColorSnackBar.INFO,
    action: 'Close',
    message: 'Hello World'
  };

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarConfig) {
    this.configDefault = { ...this.configDefault, ...data };
  }

  snackBarRef = inject(MatSnackBarRef);
}
