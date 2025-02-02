import { Component } from '@angular/core';
import { SpinerComponent } from "../../../shared/spiner/spiner.component";
import { GaleryComponent } from "../../../shared/galery-cards/galery/galery.component";
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/models.interfaces';
import { PagesCarouselComponent } from "../../../shared/carousel/pages-carousel/pages-carousel.component";
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

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
  protected userData:any;
  protected isAdmin!:boolean;


  constructor(
    private movieService:MovieService,
    private _userService:UserService
  ){}

  ngOnInit() {
    this._userService.userInformation().subscribe({
      next: (user) => {
        this.userData = user;
        if(user.role==='User'){
          this.isAdmin=false;
          localStorage.setItem('role',"false");
        }else{
          this.isAdmin=true;
          localStorage.setItem('role',"true");
        }
      },
      error: (error) => {
        console.error(error);
      }
    });


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
