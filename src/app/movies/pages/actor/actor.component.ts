import { Component } from '@angular/core';
import { ActorService } from '../../services/actor.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Actor } from '../../interfaces/models.interfaces';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-actor',
  imports: [MatButtonModule,MatIconModule,RouterModule],
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
    console.log('mellamo '+this.actorName);
    //this.actorService.getActor(this.actorName)
  }

}
