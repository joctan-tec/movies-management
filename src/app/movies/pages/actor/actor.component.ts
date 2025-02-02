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
    //setTimeout(() => {
      this.showApariciones = true;
    //}, 6000); // Retardo de 5 segundo para mostrar el reparto
  }
  getActor(){
    this.route.params.pipe(
          switchMap(params => {
            this.actorName = params['name'];
            return this.actorService.getActor(this.actorName); // Hacer la solicitud para obtener el actor
          }),
          switchMap((actor) => {
            this.actor = actor;

            // Llamamos a buscarPeliculas con todo el reparto
            return this.movieService.buscarPeliculas(this.actor.peliculas);
          })
        ).subscribe({
          next: (movies) => {
            this.apariciones = movies;  // Guardamos los actores devueltos
          },
          error: (error) => {
            console.error('Error al obtener el reparto:', error);
          },
          complete: () => {
            console.log('Todos los actores han sido cargados.');
          }
        });

  }

}
