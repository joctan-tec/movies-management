import { Component } from '@angular/core';
import { ActorService } from '../../services/actor.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Actor } from '../../interfaces/models.interfaces';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SpinerComponent } from "../../../shared/spiner/spiner.component";
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { PagesCarouselComponent } from "../../../shared/carousel/pages-carousel/pages-carousel.component";

@Component({
  selector: 'app-actor',
  imports: [MatButtonModule, MatIconModule, RouterModule, SpinerComponent, CommonModule, PagesCarouselComponent],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.scss'
})
export class ActorComponent {
  private actorName: string = '';
  protected actor!:Actor

  constructor(
    private actorService:ActorService,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.getActor();
  }
  getActor(){
    this.route.params.subscribe(params => {
      this.actorName = params['name'];
    });
    this.actorService.getActor(this.actorName).subscribe(response =>
      {
        this.actor=response;
      }
    )
  }

}
