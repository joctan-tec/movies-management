import { Component } from '@angular/core';
import { Movie } from '../../interfaces/models.interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie',
  imports: [MatButtonModule,MatIconModule,RouterModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {

  protected movie!:Movie;

}
