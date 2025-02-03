import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Actor, Movie } from '../../../movies/interfaces/models.interfaces';
import { CardComponent } from "../../cards/card/card.component";
import { PaginatorComponent } from "../paginator/paginator.component";
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { SpinerComponent } from "../../spiner/spiner.component";

@Component({
  selector: 'shared-galery',
  imports: [CardComponent, PaginatorComponent, CommonModule, SpinerComponent],
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.scss']
})
export class GaleryComponent {
  @Input() public movies: Movie[] = [];
  @Input() public actors: Actor[] = [];
  @Input() public pageSize = 6;
  @Input() public totalItems = 0; // Solo necesario si se usa API
  @Input() public useBackendPagination: boolean = false;

  @Output() public pageChange = new EventEmitter<PageEvent>();
  @Input() public admin: boolean = false;

  protected currentPageMovies = 0;
  protected currentPageActors = 0;
  protected paginatedMovies: Movie[] = [];
  protected paginatedActors: Actor[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.useBackendPagination && (changes['movies'] || changes['actors'])) {
      this.updatePaginatedCards();
    }
  }

  onPageChange(event: PageEvent): void {
    if (this.useBackendPagination) {
      this.pageChange.emit(event);
    } else {
      this.currentPageMovies = event.pageIndex;
      this.currentPageActors = event.pageIndex;
      this.pageSize = event.pageSize;
      this.updatePaginatedCards();
    }
  }

  private updatePaginatedCards(): void {
    if (this.useBackendPagination) return; // No hacer nada si se usa paginación en backend

    const startIndexMovies = this.currentPageMovies * this.pageSize;
    const endIndexMovies = startIndexMovies + this.pageSize;
    this.paginatedMovies = this.movies.slice(startIndexMovies, endIndexMovies);

    const startIndexActors = this.currentPageActors * this.pageSize;
    const endIndexActors = startIndexActors + this.pageSize;
    this.paginatedActors = this.actors.slice(startIndexActors, endIndexActors);
  }
}