import { MovieService } from './../../services/movie.service';
import { Component } from '@angular/core';
import { ActorService } from '../../services/actor.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Actor, Movie } from '../../interfaces/models.interfaces';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SpinerComponent } from "../../../shared/spiner/spiner.component";
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { PagesCarouselComponent } from "../../../shared/carousel/pages-carousel/pages-carousel.component";
import { switchMap, from, concatMap, tap } from 'rxjs';

@Component({
  selector: 'app-actor',
  imports: [MatButtonModule, MatIconModule, RouterModule, SpinerComponent, CommonModule, PagesCarouselComponent],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.scss'
})
export class ActorComponent {
  private actorName: string = '';
  protected actor!:Actor
  protected apariciones:Movie[]=[];
  protected showApariciones!:boolean;

  constructor(
    private actorService:ActorService,
    private route: ActivatedRoute,
    private movieService:MovieService
  ){}

  ngOnInit(){
    this.getActor();
    setTimeout(() => {
      this.showApariciones = true;
    }, 6000); // Retardo de 5 segundo para mostrar el reparto
  }
  getActor(){
   // this.route.params.subscribe(params => {
   //   this.actorName = params['name'];
   // });
   // this.actorService.getActor(this.actorName).subscribe(response =>
   //   {
   //     this.actor=response;
    //  }
    //)

    this.route.params.pipe(
          switchMap(params => {
            this.actorName = params['name'];
            return this.actorService.getActor(this.actorName); // Hacer la solicitud para obtener el actor
          }),
          switchMap((actor) => {
            this.actor = actor;

            // Creamos un observable secuencial para obtener las peliculas
            // Usamos 'from' para convertir el array de peliculas en un flujo de observables
            return from(this.actor.peliculas).pipe(
              concatMap(movieName =>
                this.movieService.getMovieByName(movieName).pipe(
                  tap(movie => {
                    this.apariciones.push(movie);  // Agregar la pelicula al array
                  })
                )
              )
            );
          })
        ).subscribe({
          next: () => {},
          error: (error) => {
            console.error('Error al obtener la película o los actores:', error);
          },
          complete: () => {
            console.log('Todos las peliculas han sido cargadas.');
          }
        });

  }

}
