import { MovieService } from './../../services/movie.service';
import { Component } from '@angular/core';
import { Actor, Movie } from '../../interfaces/models.interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { SpinerComponent } from "../../../shared/spiner/spiner.component";
import { PagesCarouselComponent } from "../../../shared/carousel/pages-carousel/pages-carousel.component";
import { ActorService } from '../../services/actor.service';
import { concatMap, filter, switchMap, tap } from 'rxjs/operators';
import {from } from 'rxjs';

@Component({
  selector: 'app-movie',
  imports: [MatButtonModule, MatIconModule, RouterModule, SpinerComponent, PagesCarouselComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {

  protected movie!:Movie;
  private movieName: string = '';
  protected reparto:Actor[]=[];
  protected showReparto!:boolean;


  constructor(
    private movieService:MovieService,
    private route: ActivatedRoute,
    private actorService:ActorService,
  ){}

  ngOnInit() {
    this.getMovie();
    setTimeout(() => {
      this.showReparto = true;
    }, 6000); // Retardo de 5 segundo para mostrar el reparto
  }

  getMovie() {
    //llamar a la info de movie y su reparto
    this.route.params.pipe(
      switchMap(params => {
        this.movieName = params['name'];
        return this.movieService.getMovieByName(this.movieName); // Hacer la solicitud para obtener la película
      }),
      switchMap((movie) => {
        this.movie = movie;

        // Creamos un observable secuencial para obtener los actores
        // Usamos 'from' para convertir el array de actores en un flujo de observables
        return from(this.movie.reparto).pipe(
          concatMap(actorName =>
            this.actorService.getActor(actorName).pipe(
              tap(actor => {
                this.reparto.push(actor);  // Agregar el actor al array
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
        console.log('Todos los actores han sido cargados.');
      }
    });
  }
}
