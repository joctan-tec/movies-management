import { Component, Input, SimpleChanges } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Actor, Movie } from '../../../movies/interfaces/models.interfaces';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { SpinerComponent } from "../../spiner/spiner.component";
import { ActorService } from '../../../movies/services/actor.service';

@Component({
  selector: 'shared-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterModule, MatProgressSpinnerModule, CommonModule, SpinerComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  constructor(
    private actorService:ActorService,
    private router:Router
  ){}

  @Input()
  public movie!:Movie;

  @Input()
  public actor!:Actor;

  @Input()
  public admin:Boolean=false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actors'] || changes['movies']) {

    }
  }


  delete(name:string){
    this.actorService.deleteActor(name).subscribe(response =>{
      if(response.activo){
        window.location.reload();
      }
    });
  }
}
