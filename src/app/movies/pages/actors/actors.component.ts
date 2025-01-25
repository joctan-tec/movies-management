import { Component } from '@angular/core';
import { PagesCarouselComponent } from "../../../shared/carousel/pages-carousel/pages-carousel.component";
import { GaleryComponent } from "../../../shared/galery-cards/galery/galery.component";
import { ActorService } from '../../services/actor.service';
import { Actor } from '../../interfaces/models.interfaces';

@Component({
  selector: 'app-actors',
  imports: [PagesCarouselComponent, GaleryComponent],
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.scss'
})
export class ActorsComponent {

  actors:Actor[]=[];

  constructor(
    private actorService:ActorService
  ){}

  ngOnInit(){
    this.actorService.getActors()
      .subscribe(actors => {this.actors=actors;console.log(this.actors);})

  }
}
