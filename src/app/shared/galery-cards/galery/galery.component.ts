import { Component, Input } from '@angular/core';
import { Actor, Movie } from '../../../movies/interfaces/models.interfaces';
import { CardComponent } from "../../cards/card/card.component";
import { PaginatorComponent } from "../paginator/paginator.component";
import { PageEvent } from '@angular/material/paginator';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-galery',
  imports: [CardComponent, PaginatorComponent,MatProgressSpinner],
  templateUrl: './galery.component.html',
  styleUrl: './galery.component.scss'
})
export class GaleryComponent {

  @Input()
  public movies:Movie[]=[];

  @Input()
  public actors:Actor[]=[];

  public admin:boolean =false;

  protected pageSize = 4;
  protected currentPage = 0;
  protected paginatedCards = this.movies.slice(0, this.pageSize);

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedCards = this.movies.slice(startIndex, endIndex);
  }

}
