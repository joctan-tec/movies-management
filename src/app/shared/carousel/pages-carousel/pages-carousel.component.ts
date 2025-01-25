import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CardComponent } from "../../cards/card/card.component";
import { Actor } from '../../../movies/interfaces/models.interfaces';

@Component({
  selector: 'shared-pages-carousel',
  imports: [CommonModule, CarouselModule, CardComponent],
  templateUrl: './pages-carousel.component.html',
  styleUrl: './pages-carousel.component.scss'
})
export class PagesCarouselComponent {

  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });
  responsiveOptions: any[] | undefined;

  @Input()
  actors:Actor[]=[];
  //todo llamar a traer todos los datos de los actores

  ngOnInit(): void {

    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '1199px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '575px',
          numVisible: 1,
          numScroll: 1
      }
  ]



    this.slides[0] = {
      id: 0,
      src: './assets/img/angular.jpg',
      title: 'First slide',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    };
    this.slides[1] = {
      id: 1,
      src: './assets/img/react.jpg',
      title: 'Second slide',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    };
    this.slides[2] = {
      id: 2,
      src: './assets/img/vue.jpg',
      title: 'Third slide',
      subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    };
  }

}
