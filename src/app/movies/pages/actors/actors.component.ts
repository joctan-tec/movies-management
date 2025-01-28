import { ChangeDetectorRef, Component } from '@angular/core';
import { GaleryComponent } from "../../../shared/galery-cards/galery/galery.component";
import { ActorService } from '../../services/actor.service';
import { Actor } from '../../interfaces/models.interfaces';
import { CommonModule } from '@angular/common';
import { SpinerComponent } from "../../../shared/spiner/spiner.component";

@Component({
  selector: 'app-actors',
  imports: [GaleryComponent, CommonModule, SpinerComponent],
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.scss'
})
export class ActorsComponent {

  actors:Actor[]=[];

  constructor(
    private actorService:ActorService,
    private cdRef: ChangeDetectorRef
  ){}

  ngOnInit(){
    this.actorService.getAllActors()
      .subscribe(actors => {this.actors=actors; this.cdRef.detectChanges();})
  }
}
