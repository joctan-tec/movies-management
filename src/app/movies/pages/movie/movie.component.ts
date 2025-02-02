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
  protected isAdmin!:boolean;


  constructor(
    private movieService:MovieService,
    private route: ActivatedRoute,
    private actorService:ActorService,
  ){}

  ngOnInit() {
    this.getMovie();
    //setTimeout(() => {
    if(localStorage.getItem('role')==='false'){
      this.isAdmin=false;
    }else{
      this.isAdmin=true;
    }
    //}, 6000); // Retardo de 5 segundo para mostrar el reparto
  }

  getMovie() {
    //llamar a la info de movie y su reparto
    this.route.params.pipe(
      switchMap(params => {
        this.movieName = params['name'];
        return this.movieService.getMovieByName(this.movieName); // Obtiene la película
      }),
      switchMap((movie) => {
        this.movie = movie;

        // Llamamos a buscarPeliculas con todo el reparto
        return this.actorService.buscarActores(this.movie.reparto);
      })
    ).subscribe({
      next: (actores) => {
        this.reparto = actores;  // Guardamos los actores devueltos
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
