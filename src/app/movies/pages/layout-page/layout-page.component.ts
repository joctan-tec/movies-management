import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../Components/header/header.component';

@Component({
  selector: 'app-layout-page',
  imports: [RouterModule, HeaderComponent],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss'
})
export class LayoutPageComponent {

}
