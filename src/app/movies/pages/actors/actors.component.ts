import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SpinerComponent } from '../../../shared/spiner/spiner.component';
import { GaleryComponent } from '../../../shared/galery-cards/galery/galery.component';
import { ActorService } from '../../services/actor.service';
import { Actor } from '../../interfaces/models.interfaces';
import { CommonModule } from '@angular/common';
import { SearchBarComponent, SearchForm } from '../../../shared/search-bar/search-bar.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-actors',
  standalone: true,
  imports: [SpinerComponent, GaleryComponent, CommonModule, SearchBarComponent, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatOptionModule, ReactiveFormsModule],
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorsComponent {
  actors: Actor[] = [];
  searchQuery: string = '';
  searchResults: Actor[] = [];
  totalResults: number = 0;
  pageSize: number = 6;
  currentPage: number = 1;
  totalPages: number = 1;
  isSearching: boolean = false;
  existSearch : boolean = false;
  protected isAdmin!: boolean;

  constructor(private actorService: ActorService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.isAdmin = localStorage.getItem('role') !== 'false';
    this.loadActors();
  }

  loadActors() {
    this.actorService.getAllActors().subscribe(actors => {
      this.actors = actors;
      this.cdRef.detectChanges();
    });
  }

  onSearch(searchForm: SearchForm) {
    this.isSearching = true;
    this.searchQuery = searchForm.search;
    this.existSearch = true;

    this.actorService.searchActors(this.searchQuery, this.currentPage, this.pageSize).subscribe(response => {
      if (response.success) {
        this.searchResults = response.actors;
        this.totalResults = response.totalResults;
        this.totalPages = response.totalPages;
        this.currentPage = Number(response.currentPage);
      } else {
        this.searchResults = [];
        this.totalResults = 0;
        this.totalPages = 1;
        this.currentPage = 1;
      }

      this.isSearching = false;
      this.cdRef.detectChanges();
    }, error => {
      console.error('Error en la búsqueda:', error);
      this.isSearching = false;
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
      return;
    }
    this.onSearch({
      search: this.searchQuery,
      selected: ''
    });
  }
}