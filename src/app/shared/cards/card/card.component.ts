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
import { MovieService } from '../../../movies/services/movie.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../movies/Components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'shared-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterModule, MatProgressSpinnerModule, CommonModule, SpinerComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  [x: string]: any;

  constructor(
    private actorService:ActorService,
    private movieService:MovieService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
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


  deleteActor(name:string){

    const dialogRef =  this.dialog.open(ConfirmDialogComponent, {
      data: name
    });

    dialogRef.afterClosed()
      .subscribe( (result) => {
        if (!result) return;

        this.actorService.deleteActor(name).subscribe(response =>{
          if(response.activo){
            window.location.reload();
            this.snackbar.open(`Actor@ ${name} eliminado!`, 'Cerrar',{duration:3000});
          }
        });
      });
  }

  deleteMovie(MovieName:string){
    //delete movie
    //this.movieService.deleteActor(name).subscribe(response =>{
   //   if(response.activo){
   //     window.location.reload();
   //   }
   // });

  }

}
