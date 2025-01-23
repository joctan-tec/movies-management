import { Component } from '@angular/core';
import { PagesCarouselComponent } from "../../../shared/carousel/pages-carousel/pages-carousel.component";
import { GaleryComponent } from "../../../shared/galery-cards/galery/galery.component";

@Component({
  selector: 'app-actors',
  imports: [PagesCarouselComponent, GaleryComponent],
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.scss'
})
export class ActorsComponent {

}
