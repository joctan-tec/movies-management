import { Component, Input, SimpleChanges } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Actor, Movie } from '../../../movies/interfaces/models.interfaces';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-card',
  imports: [MatCardModule,MatButtonModule,MatIconModule,RouterModule,MatProgressSpinnerModule,CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input()
  public movie!:Movie;

  @Input()
  public actor!:Actor;

  @Input()
  public admin:Boolean=false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actors'] || changes['movies']) {
      console.log('Actors:', this.actor);

    }
  }

  ngOnInit() {
    console.log('Actor receivesd:', this.actor);
  }
}
