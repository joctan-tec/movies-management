import { Component, Input, SimpleChanges } from '@angular/core';
import { Actor, Movie } from '../../../movies/interfaces/models.interfaces';
import { CardComponent } from "../../cards/card/card.component";
import { PaginatorComponent } from "../paginator/paginator.component";
import { PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-galery',
  imports: [CardComponent, PaginatorComponent, MatProgressSpinner, CommonModule],
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.scss']
})
export class GaleryComponent {
  @Input() public movies: Movie[] = [];
  @Input() public actors: Actor[] = [];

  public admin: boolean = false;

  // Propiedades para paginación
  @Input() public pageSize = 4;

  protected currentPageMovies = 0;
  protected currentPageActors = 0;

  // Tarjetas paginadas
  protected paginatedMovies: Movie[] = [];
  protected paginatedActors: Actor[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movies'] || changes['actors']) {
      this.updatePaginatedCards(); // Actualiza las tarjetas visibles si cambian los datos de entrada
    }
  }

  onPageChangeMovies(event: PageEvent): void {
    this.currentPageMovies = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedCards();
  }

  onPageChangeActors(event: PageEvent): void {
    this.currentPageActors = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedCards();
  }

  private updatePaginatedCards(): void {
    // Actualiza las tarjetas visibles para las películas
    const startIndexMovies = this.currentPageMovies * this.pageSize;
    const endIndexMovies = startIndexMovies + this.pageSize;
    this.paginatedMovies = this.movies.slice(startIndexMovies, endIndexMovies);

    // Actualiza las tarjetas visibles para los actores
    const startIndexActors = this.currentPageActors * this.pageSize;
    const endIndexActors = startIndexActors + this.pageSize;
    this.paginatedActors = this.actors.slice(startIndexActors, endIndexActors);
  }
}
