import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CardComponent } from "../../cards/card/card.component";
import { Actor, Movie } from '../../../movies/interfaces/models.interfaces';

@Component({
  selector: 'shared-pages-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule, CardComponent],
  templateUrl: './pages-carousel.component.html',
  styleUrls: ['./pages-carousel.component.scss']
})
export class PagesCarouselComponent {
  @Input() actors: Actor[] = []; // Lista completa de actores
  @Input() movies: Movie[] = []; // Lista completa de películas

  responsiveOptions: any[] = []; // Opciones del carrusel para diferentes tamaños de pantalla

  constructor() {
    // Configuración del carrusel
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3, // Mostrar 3 elementos visibles
        numScroll: 3   // Avanzar de 3 en 3
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '767px',
        numVisible: 2, // Mostrar 2 elementos visibles en pantallas pequeñas
        numScroll: 2   // Avanzar de 2 en 2
      },
      {
        breakpoint: '575px',
        numVisible: 1, // Mostrar 1 elemento visible en pantallas muy pequeñas
        numScroll: 1   // Avanzar de 1 en 1
      }
    ];
  }

}
