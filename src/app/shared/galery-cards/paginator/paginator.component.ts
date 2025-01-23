import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'shared-paginator',
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {


  @Input() totalItems = 0; // Total de elementos (se pasa desde el padre)
  @Input() pageSize = 4; // Número de elementos por página
  @Output() pageChange = new EventEmitter<PageEvent>(); // Emite los cambios de página

  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event); // Emitir el evento al componente padre
  }

}
