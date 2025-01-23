import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Actor, Movie } from '../../../movies/interfaces/models.interfaces';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'shared-card',
  imports: [MatCardModule,MatButtonModule,MatIconModule,RouterModule,MatProgressSpinnerModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input()
  public movies:Movie[]=[];

  @Input()
  public actors:Actor[]=[];

  @Input()
  public admin:Boolean=false;
}
