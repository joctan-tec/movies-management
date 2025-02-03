import {ChangeDetectionStrategy, Component, signal, EventEmitter, Input, Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { SpinerComponent } from "../../../shared/spiner/spiner.component";
import { GaleryComponent } from "../../../shared/galery-cards/galery/galery.component";
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/models.interfaces';
import { PagesCarouselComponent } from "../../../shared/carousel/pages-carousel/pages-carousel.component";
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { SearchBarComponent, SearchForm } from '../../../shared/search-bar/search-bar.component';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-movies',
  imports: [SpinerComponent, GaleryComponent, PagesCarouselComponent, CommonModule, SearchBarComponent, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatOptionModule, ReactiveFormsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  [x: string]: any;

  protected movies:Movie[]=[];
  protected TopMovies:Movie[]=[];

  protected userData:any;
  protected isAdmin!:boolean;

  

  searchQuery: string = '';
  filterGenre: string | undefined = undefined;
  filterYear: number | undefined = undefined;
  filterRating: number | undefined = undefined;
  searchResults: Movie[] = [];
  totalResults: number = 0;
  pageSize: number = 6;
  currentPage: number = 1;
  totalPages: number = 1;
  isSearching: boolean = false;
  genders: string[] = ["Todos"];
  years: number[] = [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012];
  ratings: number[] = [1, 2, 3, 4, 5];


  filterForm!: FormGroup;

  constructor(private fb: FormBuilder, private movieService: MovieService, private _userService:UserService) {
      this.filterForm = this.fb.group({
        genre: [''],
        year: [''],
        rating: ['']
      });
    }

  ngOnInit() {

          // Info = { generos: string[], años_lanzamiento: number[], calificaciones: number[] }
    // Set the default value of the select
    this.movieService.getMoviesInfo().subscribe({
      next: (info) => {
        //Order years
        this.years = info.años_lanzamiento.sort((a: number, b: number) => b - a);
        //order ratings
        this.ratings = info.calificaciones.sort((a: number, b: number) => b - a);
        //Order genres
        this.genders = info.generos.sort((a: string, b: string) => a.localeCompare(b));
        this.genders.unshift("Todos");
      },
      error: (error) => {
        console.log(error);
      }
    });


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



    

  };

  onFilter() {
    this.onSearch({
      search: this.searchQuery,
      selected: this.filterGenre || ''
    });
  }

  onSearch(seachForm: SearchForm) {
    this.isSearching = true;
    this.searchQuery = seachForm.search;
    if(this.filterForm.get('genre')?.value){
      this.filterGenre = this.filterForm.get('genre')?.value;
    }else{
      this.filterGenre = seachForm.selected;
      this.filterForm.patchValue({ genre: seachForm.selected });
    }   
    this.filterYear = this.filterForm.get('year')?.value;
    this.filterRating = this.filterForm.get('rating')?.value;

    console.log(this.searchQuery, this.filterGenre, this.filterYear, this.filterRating);
  
    this.movieService.searchMovies(this.searchQuery, this.filterGenre, this.filterYear, this.filterRating, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.movies.length === 0) this.filterForm.patchValue({ genre: 'todos', year: undefined, rating: undefined });
          this.searchResults = response.movies;
          this.totalResults = response.totalResults;
          this.currentPage = response.currentPage;
          this.pageSize = response.pageSize;
          this.totalPages = response.totalPages;
          this.isSearching = false;
        },
        error: (error) => {
          console.log(error);
          this.isSearching = false;
        }
      });
  }
  



  onPageChange(event: PageEvent) {
    
    this.currentPage = event.pageIndex + 1;
    // Si la pagina actual es mayor a la cantidad de paginas no avanza
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
      return;
    }

    this.onSearch({
      search: this.searchQuery,
      selected: this.filterGenre || ''
    });
  }

}
