import {ChangeDetectionStrategy, Component, signal, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


export interface SearchForm {
  search: string;
  selected: string;
}


@Component({
  selector: 'search-bar',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatOptionModule, ReactiveFormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})


export class SearchBarComponent {

  selected: string = 'all';
  searchControl: FormControl = new FormControl();
  @Input() searchQuery: string = '';
  @Input() searchCategories: string[] = [];
  @Input() placeholder: string = 'Search...';
  categories : {value: string, viewValue: string}[] = [
    {value: 'all', viewValue: 'All'},
    {value: 'movies', viewValue: 'Movies'},
    {value: 'actors', viewValue: 'Actors'}
  ]
  @Input() noFilter = false;

  @Output() search: EventEmitter<SearchForm> = new EventEmitter<SearchForm>();

  searchForm!: FormGroup;

  constructor(private fb: FormBuilder) {
      this.searchForm = this.fb.group({
        search: [''],
        selected: ['']
      });
    }
  
    ngOnInit() {
      // Set the default value of the select
      this.categories = this.searchCategories.map(category => ({ value: category, viewValue: category }));
      this.searchForm.patchValue({ selected: this.categories[0].value });
      
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes['searchCategories']) {
        this.categories = this.searchCategories.map(category => ({ value: category, viewValue: category }));
        //Encuentra el valor de Todos y se lo coloca al select
        const all = this.categories.find(category => category.value === 'Todos');
        if (all) {
          this.searchForm.patchValue({ selected: all.value });
        }


      }
    }


  onSearch() {
    this.search.emit(this.searchForm.value);
    
  }

  




}
