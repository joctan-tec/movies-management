import { Component } from '@angular/core';
import { SpinerComponent } from "../../../shared/spiner/spiner.component";
import { GaleryComponent } from "../../../shared/galery-cards/galery/galery.component";
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/models.interfaces';
import { PagesCarouselComponent } from "../../../shared/carousel/pages-carousel/pages-carousel.component";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  imports: [SpinerComponent, GaleryComponent, PagesCarouselComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  [x: string]: any;

  protected movies:Movie[]=[];
  protected TopMovies:Movie[]=[];


  constructor(
    private movieService:MovieService
  ){}

  ngOnInit() {
    this.movieService.getAllMovies()
      .pipe(
        switchMap(movies => {
          this.movies = movies;  // Primero llenamos `movies`
          return this.movieService.getTopTenMovies(); // Luego llamamos a `getTopTenMovies()`
        })
      )
      .subscribe(topMovies => {
        this.TopMovies = topMovies;
      });
  }

}
